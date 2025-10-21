import { fetchCategories, fetchQuestions } from '../services/triviaApi';
import { useState, useEffect, useMemo } from 'react';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const globalCache = {
    categories: null,
    questions: null
};

export const useData = () => {
    const [categories, setCategories] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); //null=all categories to filter by selected category
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
        setLoading(true);
        setError(null);
        try{    
            let ctgrs = globalCache.categories;
            if (!ctgrs) {
                ctgrs = await fetchCategories();
                globalCache.categories = ctgrs;
            }
            setCategories(ctgrs);

            let qstns = globalCache.questions;
            if (!qstns) {
                qstns = await fetchQuestions(50);
                globalCache.questions = qstns;
                }
                setAllQuestions(qstns);
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error.message || 'Failed to load data');
            } finally {
                    setLoading(false);
            }
        };
        loadData();
    }, []); //run only one time to fetch the data

    const filteredQuestions = useMemo(() => { //filter from memory
        if (selectedCategory === null) {
            return allQuestions;
        }
        return allQuestions.filter(q => q.category === selectedCategory);
    }, [allQuestions, selectedCategory]);

    const categoryDistribution = useMemo(() => { //category distr from memory
        const distribution = {};

        allQuestions.forEach(q => {
            const ctgr = q.category;
            distribution[ctgr] = (distribution[ctgr] || 0) + 1;
            
        });;
        
        return Object.entries(distribution) //turning into map for the recharts
        .map(([name, count]) => ({ name, count}))
        .sort((a, b) => a.count - b.count); //sorting 
    }, [allQuestions]);


    const difficultyDistribution = useMemo(() => {
        const distribution = { easy: 0, medium: 0, hard: 0 };
        
        filteredQuestions.forEach(q => { //using anready filtered data to prevent any mistakes
            if (q.difficulty in distribution) {
                distribution[q.difficulty]++;
            }
        });
        
        return Object.entries(distribution).map(([difficulty, count]) => ({ //turning into map for recharts
            difficulty,
            count
        }));
    }, [filteredQuestions]);
        
    const filterByCategory = (categoryName) => { //function to change the filter without api
        setSelectedCategory(categoryName);
    };


    return {
    categories, 
    questions: filteredQuestions,
    allQuestions,                     
    loading,              // true/false
    error,
    selectedCategory,     // ID or null
    filterByCategory, // function to filtrate
    categoryDistribution,    
    difficultyDistribution  
  };
};
