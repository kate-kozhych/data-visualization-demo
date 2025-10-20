const BASE_URL = 'https://opentdb.com';

function getFromCache(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function saveToCache(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function fetchCategories() {
    const cached = getFromCache('categories');
    if (cached) {
    console.log('Categories from cache');
    return cached;
  }
   try {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    const json = await response.json();
    const categories = json.trivia_categories || [];
    saveToCache('categories', categories);
    return categories;
  }
  catch (e) {
    console.error('We have the error fetching categories', e);
    throw e;
  }
}

export async function fetchQuestions(amount=50, category = null) {
  const cacheKey = category 
    ? `questions_category_${category}` 
    : 'questions_all';
  
  const cached = getFromCache(cacheKey);
  if (cached) {
    console.log('Questions from cache');
    return cached;
  }
   try {
    let url = `${BASE_URL}/api.php?amount=${amount}`
    if (category) {
      url += `&category=${category}`; //if there is category we will add it to our url
    }
    const response = await fetch(url);
        if (response.status === 429) {
      throw new Error('Too many requests. Please wait and try again.');
    }
    const json = await response.json();
    const questions = json.results || [];
    saveToCache(cacheKey, questions);
    return questions;
  }
  catch (e) {
    console.error('We have the error fetching questions', e);
    throw e;
  }
}