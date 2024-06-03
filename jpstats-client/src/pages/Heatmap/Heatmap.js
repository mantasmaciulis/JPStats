import "./Heatmap.css";
import MyCalHeatmap from "../../components/MyCalHeatmap/MyCalHeatmap.tsx";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card.js";
import { getAllReviews, getNewReviewDays } from "../../apiJPStats";

function Heatmap() {
    const [reviewTimestamps, setReviewTimestamps] = useState([]);
    const [isAllReviews, setIsAllReviews] = useState(true);

    useEffect(() => {
        const cacheKey = isAllReviews ? 'allReviewsData' : 'newReviewsData';
        const savedData = localStorage.getItem(cacheKey);

        if (savedData) {
            setReviewTimestamps(JSON.parse(savedData));
            //use cache first - then update. This prevents longer loading time and is useful
            //as past review data does not change.
            const fetchData = async () => {
              try {
                  const data = isAllReviews ? await getAllReviews() : await getNewReviewDays();
                  localStorage.setItem(cacheKey, JSON.stringify(data));
                  setReviewTimestamps(data);
              } catch (error) {
                  console.error('Error fetching review data:', error);
              }
          };
          fetchData();
        } else {
            const fetchData = async () => {
                try {
                    const data = isAllReviews ? await getAllReviews() : await getNewReviewDays();
                    //Store data in cache to speed up future displaying of data.
                    localStorage.setItem(cacheKey, JSON.stringify(data));
                    setReviewTimestamps(data);
                } catch (error) {
                    console.error('Error fetching review data:', error);
                }
            };
            fetchData();
        }
    }, [isAllReviews]);

    const [revBtnGroupActive, setRevBtnGroupActive] = useState('All Reviews');

    const handleButtonClick = (name) => {
        setRevBtnGroupActive(name);
        setIsAllReviews(name === 'All Reviews');
    };
    const revBtnGroup = [
        { name: 'All Reviews' },
        { name: 'New Reviews' },
    ];
   
    return (
        <Card className="heatmap-card">
            <div className="heatmap-options">
                <div className="toggle-button-group">
                    {revBtnGroup.map((button) => (
                        <button
                            key={button.name}
                            className={`toggle-button ${revBtnGroupActive === button.name ? 'active1' : ''}`}
                            style={{ backgroundColor: revBtnGroupActive === button.name ? button.color : '#D9D9D9' }}
                            onClick={() => handleButtonClick(button.name)}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>

              
            </div>

            <hr className="divider"/>
            {reviewTimestamps.length > 0 ? (
                <div id="heatmap">
                    <MyCalHeatmap
                        timestamps={reviewTimestamps}
                        isAllReviews={isAllReviews}

                    />
                </div>
            ) : (
                //TODO: Idea: Maybe we could have fancy frame instead?
                <center>Heatmap Loading...</center>
            )}
        </Card>
    );
}

export default Heatmap;
