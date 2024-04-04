const BASE_URL = 'https://api.jpstats.mantasmaciulis.com/';

export const getAllReviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}getAllReviews`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw error;
  }
};

export const getNewReviewDays = async () => {
  try {
    const response = await fetch(`${BASE_URL}getNewReviewDays`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching new review days:', error);
    throw error;
  }
};

export const getStreak = async () => {
    try {
      const response = await fetch(`${BASE_URL}getStreak`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.streak;
    } catch (error) {
      console.error('Error fetching streak:', error);
      throw error;
    }
  };

export const getDaysStudiesCount = async () => {
    try {
        const response = await fetch(`${BASE_URL}getDaysStudied`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data["days-studied"];
      } catch (error) {
        console.error('Error fetching streak:', error);
        throw error;
      }
}

export const getRecentlyLearnedCounts = async () => {
  try {
    const response = await fetch(`${BASE_URL}getRecentNewCards`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching streak:', error);
    throw error;
  }
}

export const getConsistency = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getConsistency`);
    if (!response.ok) throw new Error('Network response was not ok');
    const consistency = await response.json();
    return consistency['consistency'];

  } catch (error) {
    console.error('Error fetching consistency:', error);
    throw error;
  }
}

export const getTotalVocab = async () => {
  try {
    const response = await fetch(`${BASE_URL}//getTotalVocab`);
    if (!response.ok) throw new Error('Network response was not ok');
    const totalVocab = await response.json();
    console.log(totalVocab)
    return totalVocab['total_vocab_count'];

  } catch (error) {
    console.error('Error fetching total vocabß:', error);
    throw error;
  }
}