import { useData } from './hooks/useData'
import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css'
import CategoryFilter from './components/CategoryFilter';
import CategoryChart from './components/CategoryChart';
import DifficultyChart from './components/DifficultyChart';

function App() {
  const { categories, 
    questions: filteredQuestions,
    allQuestions,                     
    loading,              // true/false
    error,
    selectedCategory,     // ID or null
    filterByCategory, // function to filtrate
    categoryDistribution,    
    difficultyDistribution   } = useData();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) { 
    return (
      <div style={{ color: 'red' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Trivia Visualization</h1>
      <Card className="main-card">
        <CategoryFilter 
          categories={categories}
          selected={selectedCategory}
          onSelect={filterByCategory}
        />
      </Card>

      <Card title="Questions by Category" className="chart-card">
        <CategoryChart 
        data={categoryDistribution}
        />
      </Card>

      <Card title="Difficulty by Category" className="chart-card">
        <DifficultyChart 
        data={difficultyDistribution}
        />
      </Card>
    </div>
  );
}

export default App;
