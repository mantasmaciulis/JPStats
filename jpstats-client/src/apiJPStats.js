// src/api/apiJPStats.js

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