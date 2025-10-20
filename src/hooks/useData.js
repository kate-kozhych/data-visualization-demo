import { fetchCategories, fetchQuestions } from '../services/triviaApi';
import { useState, useEffect } from 'react';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useData = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); //null=all categories to filter by selected category
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
        setLoading(true);

        const ctgrs = await fetchCategories();
        setCategories(ctgrs);
        await delay(5000);

        const qstns = await fetchQuestions(50);
        setQuestions(qstns);

        setLoading(false);
        };
        loadData();
    }, []); //run only one time to fetch the data

    const filterByCategory = async (categoryId) => {
        setSelectedCategory(categoryId)
        await delay(5000);
        if (categoryId === null) { //user chose All Categories 
        const qstns = await fetchQuestions(50); //so we just fetch all questions
        setQuestions(qstns);
        } else {
        const setFilteredQuestions = await fetchQuestions(50, categoryId);
        setQuestions(setFilteredQuestions);
        }
    };

    return {
    categories,           
    questions,            
    loading,              // true/false
    selectedCategory,     // ID or null
    filterByCategory      // function to filtrate
  };
};
