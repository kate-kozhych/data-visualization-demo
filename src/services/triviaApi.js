const BASE_URL = 'https://opentdb.com';

export async function fetchCategories() {
   try {
    const response = await fetch(`${BASE_URL}/api_category.php`);
    const json = await response.json();
    const categories = json.trivia_categories || [];
    return categories;
  }
  catch (e) {
    console.error('We have the error fetching categories', e);
    throw e;
  }
}

export async function fetchQuestions(amount=50, category = null) {
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
    return questions;
  }
  catch (e) {
    console.error('We have the error fetching questions', e);
    throw e;
  }
}