import requests
import os
from datetime import datetime, timedelta
from pymongo import MongoClient
import pymongo
import re
import json
import http.client
from dotenv import load_dotenv

load_dotenv()

def download_revlogs():
    """
    This funciton downloads the reviews.json file from jpdb.io, which contains:
    "vid": 1437450,
        "spelling": "適当",
        "reading": "てきとう",
        "reviews": [....
    """

    login_url = 'https://jpdb.io/login'
    revlog_url = 'https://jpdb.io/export/reviews.json'

    payload = {
        'username': os.getenv('JPDB_USERNAME'),
        'password': os.getenv('JPDB_PASSWORD')
    }

    with requests.Session() as session:
        post = session.post(login_url, data=payload)
        if post.status_code == 200:
            print("Login successful!")
            get = session.get(revlog_url)
            get.raise_for_status()
            os.makedirs(os.path.expanduser('~/jpdb_data'), exist_ok=True)

            filename = os.path.expanduser(f'~/jpdb_data/reviews_{datetime.now().strftime("%Y-%m-%d")}.json')
            with open(filename, 'wb') as f:
                f.write(get.content)
            print("File downloaded successfully!")
        else:
            print("Login failed.")

def download_vocab_info(API_TOKEN):
    """
    This connects to JPDB via the API and fetches all the vocabulary present within my decks, 
    this will later be augmented with the review data from revlogs and saved into a mongoDB, 
    further data will be gathered over time as well, such as memory strength data which cannot
    be gathered from JPDB.
    """
    connection = http.client.HTTPSConnection("jpdb.io")

    payload_for_deck_ids = {
        "fields": [
            "name",
            "id"
        ]
    }

    headers = {
        'Content-Type': "application/json",
        'Accept': "application/json",
        'Authorization': f"Bearer {API_TOKEN}"
    }

    # Fetch deck IDs
    connection.request("POST", "/api/v1/list-user-decks", json.dumps(payload_for_deck_ids), headers)
    response = connection.getresponse()
    deck_ids = response.read()
    decoded_deck_id_data = json.loads(deck_ids)

    all_vocab_lists = []

    if decoded_deck_id_data and 'decks' in decoded_deck_id_data:
        for deck in decoded_deck_id_data['decks']:
            deck_id = deck[1]
            payload_for_vocab_list = {
                "id": deck_id,
                "fetch_occurences": False,
            }
            connection.request("POST", "/api/v1/deck/list-vocabulary", json.dumps(payload_for_vocab_list), headers)
            res = connection.getresponse()
            vocab_list = res.read()
            decoded_vocab_list = json.loads(vocab_list)
            all_vocab_lists.extend(decoded_vocab_list['vocabulary'])

    # Define payload for vocabulary lookup
    payload_for_vocab_lookup = {
        "list": all_vocab_lists,
        "fields": [
            "vid",
            "sid",
            "rid",
            "spelling",
            "reading",
            "frequency_rank",
            "card_level",
            "card_state",
            "due_at",
            "alt_sids",
            "alt_spellings",
        ]
    }

    # Fetch detailed vocabulary information
    connection.request("POST", "/api/v1/lookup-vocabulary", json.dumps(payload_for_vocab_lookup), headers)
    response = connection.getresponse()
    detailed_vocab_list = response.read()
    detailed_decoded_vocab_list = json.loads(detailed_vocab_list)

    # Transform list of lists into list of dictionaries
    vocab_dicts = []
    headings = ["vid", "sid", "rid", "spelling", "reading", "frequency_rank", "card_level", "card_state", "due_at", "alt_sids", "alt_spellings"]
    for vocab in detailed_decoded_vocab_list["vocabulary_info"]:
        vocab_dicts.append(dict(zip(headings, vocab)))

    # Save to file
    today = datetime.today().strftime('%Y-%m-%d')
    filename = os.path.expanduser(f'~/jpdb_data/vocab_details_{today}.json')
    os.makedirs(os.path.expanduser('~/jpdb_data'), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(vocab_dicts, file, ensure_ascii=False, indent=4)

    connection.close()

    return vocab_dicts


def upload_heatmap_data_to_mongo():
    """
    This function processes the revlogs downloaded previously in order to upload
    them to the heatmap collection of jpstats for easier visualization and
    retrival in the future.
    """
    client = MongoClient('localhost', 27017)
    db = client['jp-stats']
    collection = db['heatmap_data']

    def insert_bunpro_data(file_path):
        """
        Bunpro is a grammar SRS website I used to frequently review, it is also 
        added to the collection for future use.
        """

        with open(file_path, 'r') as file:
            data = json.load(file)

        bunpro_old_data = []
        for timestamp, count in data.items():
            bunpro_old_data.extend([int(timestamp) for _ in range(count)])

        document = {
            "bunpro": {
                "old": bunpro_old_data
            }
        }
        collection.insert_one(document)

    def insert_jpdb_vocab_data(file_path):    
        with open(file_path, 'r') as file:
            data = json.load(file)
        
        document = {
            # The first review of every unique vocab is stored as "new", wheras
            # every subsequent review of that vocab is stored in old. This aids
            # in easier separation for the heatmap which displays when new words
            # are learned, or old ones are reviewed.
            "jpdb": {
                "old": [],
                "new": []
            }
        }
        
        for vocab_list in ["cards_vocabulary_jp_en", "cards_vocabulary_en_jp"]:
            # reviews.json separares reviews into jp->en and en->jp but we do not 
            # need to consider this.
            if vocab_list in data:
                for vocab in data[vocab_list]:
                    reviews = vocab["reviews"]
                    if reviews:
                        document["jpdb"]["new"].append(reviews[0]["timestamp"])
                        if len(reviews) > 1:
                            document["jpdb"]["old"].extend([review["timestamp"] for review in reviews[1:]])
        
        collection.insert_one(document)
    

    date_str = datetime.now().strftime("%Y-%m-%d")
    bunpro_file_path = f"/home/mainuser/jpdb_data/bunpro_heatmap_{date_str}.html"
    jpdb_file_path = f"/home/mainuser/jpdb_data/reviews_{date_str}.json"
    legacy_file_path = f"/home/mainuser/jpdb_data/legacy.json"

    collection.delete_many({})   # TODO: look into optimizing this later
    # insert_bunpro_data(bunpro_file_path)
    insert_jpdb_vocab_data(jpdb_file_path)
    insert_jpdb_vocab_data(legacy_file_path)


def update_mongo_daily_jpdb_vocab_data():
    def connect_to_db():
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["jp-stats"]
        collection = db['jpdb_vocab_data']
        missing_vid_collection = db['jpdb_vocab_missing_vid_has_revs']
        return collection, missing_vid_collection

    def process_vocab_details_file(collection, data, ignore_never_forget, date):
        for document in data:
            existing_document = collection.find_one({'_id': str(document['vid'])})
            if existing_document is None:
                document['_id'] = str(document['vid'])
                document['vid'] = str(document['vid'])
                document['sid'] = str(document.get('sid'))
                document['rid'] = str(document.get('rid'))
                document['alt_sids'] = [str(sid) for sid in document.get('alt_sids', [])]
                document['reviews'] = []
                document['card_levels_by_date'] = []

                if document.get('card_level') is not None:
                    document['card_levels_by_date'].append({
                        'date': date,
                        'level': document.get('card_level')
                    })

                collection.insert_one(document)
            else:
                if ignore_never_forget and document.get('card_state') == 'never-forget':
                    continue

                updates = {
                    'card_level': document.get('card_level'),
                    'card_state': document.get('card_state'),
                    'due_at': document.get('due_at')
                }

                collection.update_one({'_id': str(document['vid'])}, {'$set': updates})

                last_level = existing_document['card_levels_by_date'][-1]['level'] if existing_document['card_levels_by_date'] else None
                if document.get('card_level') is not None and document.get('card_level') != last_level:
                    new_date_level = {
                        'date':date,
                        'level': document.get('card_level')
                    }
                    collection.update_one({'_id': str(document['vid'])}, {'$push': {'card_levels_by_date': new_date_level}})

    def add_reviews(collection, missing_vid_collection, data):
        for field in ['cards_vocabulary_jp_en', 'cards_vocabulary_en_jp']:
            for document in data[field]:
                existing_document = collection.find_one({'_id': str(document['vid'])})
                if existing_document is None:
                    missing_vid_collection.insert_one(document)
                else:
                    for review in document['reviews'] :
                        review['source'] = field
                        existing_review = next((r for r in existing_document['reviews'] if r['timestamp'] == review['timestamp']), None)
                        if existing_review is None:
                            result = collection.update_one({'_id': str(document['vid'])}, {'$push': {'reviews': review}})
                            if result.modified_count == 0:
                                print(f"Failed to add review: {review} to {document['vid']}")

    collection, missing_vid_collection = connect_to_db()
    base_directory = "/home/mainuser/jpdb_data"
    today = datetime.now().strftime('%Y-%m-%d')
    vocab_filename = f"vocab_details_{today}.json"
    revlogs_filename = f"reviews_{today}.json"

    if vocab_filename in os.listdir(base_directory):
        with open(os.path.join(base_directory, vocab_filename), 'r') as file:
            data = json.load(file)
        process_vocab_details_file(collection, data, False, today)

    if revlogs_filename in os.listdir(base_directory):
        with open(os.path.join(base_directory, revlogs_filename), 'r') as file:
            data = json.load(file)
        add_reviews(collection, missing_vid_collection, data)

def update_mongo_daily_vocab_count():
    """
    This is the first type of extra data that my backend tracks that jpdb cannot provide the way I wish using historical data.
    Every day we count how many vocab words are in states known, never-forget, learning and due to log a count of known vocab
    on this date. This intentionally ignores "failed" cards as technically they are not known if they were failed.

    The work around would be to just count number of first reviews until date x, to get a count for words known on date x, 
    however there are several problems.

    (1) Does not account for failed cards
    (2) This separate collection was initially populated with word counts learned from before I began using jpdb, which leads
    to a better vocab known over time graph, and is then updated daily via this.
    """
    client = pymongo.MongoClient('mongodb://localhost:27017/')
    db = client['jp-stats']
    vocab_details_collection = db['jpdb_vocab_data']
    vocab_log_collection = db['cumulative-words-known']

    total_vocab_count = vocab_details_collection.count_documents({
        "$or": [
            { "card_state": "known" },
            { "card_state": "never-forget" },
            { "card_state": "learning" },
            { "card_state": "due" }
        ]
        })
    
    today = datetime.now()
    log_document = {
    "date": today,
    "Total Words Known": total_vocab_count
    }
    vocab_log_collection.insert_one(log_document)




def main():
    API_TOKEN = os.getenv('JPDB_API_TOKEN')
    download_revlogs()
    download_vocab_info(API_TOKEN)
    upload_heatmap_data_to_mongo()
    update_mongo_daily_jpdb_vocab_data()
    update_mongo_daily_vocab_count()

if __name__ == "__main__":
    main()
