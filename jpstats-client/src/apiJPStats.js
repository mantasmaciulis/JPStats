const BASE_URL = 'https://api.jpstats.mantasmaciulis.com/';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const getAllReviews = async () => {
  return await fetchData('getAllReviews');
};

export const getNewReviewDays = async () => {
  return await fetchData('getNewReviewDays');
};

export const getStreak = async () => {
  const data = await fetchData('getStreak');
  return data.streak;
};

export const getDaysStudiesCount = async () => {
  const data = await fetchData('getDaysStudied');
  return data["days-studied"];
};

export const getRecentlyLearnedCounts = async () => {
  return await fetchData('getRecentNewCards');
};

export const getConsistency = async () => {
  const consistency = await fetchData('getConsistency');
  return consistency['consistency'];
};

export const getTotalVocab = async () => {
  const totalVocab = await fetchData('getTotalVocab');
  console.log(totalVocab);
  return totalVocab['total_vocab_count'];
};

export const getNewVocabOverTime = async () => {
  return await fetchData('vocabOverTime');
};

export const getNewVocabPerWeek = async () => {
  return await fetchData('getNewReviewWeeks');
};

export const getCountsByLevel = async () => {
  return await fetchData('countsByLevel');
};