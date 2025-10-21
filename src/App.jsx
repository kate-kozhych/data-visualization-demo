import { useData } from './hooks/useData'
import { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css'
import CategoryFilter from './components/CategoryFilter';
import CategoryChart from './components/CategoryChart';
import DifficultyChart from './components/DifficultyChart';

const LoadingState = () => (
  <div className="loading-container">
    <div className="center-state">
      <div className="spinner"></div>
      <h2>Loading Trivia Data...</h2>
      <p>Fetching questions from Open Trivia DB :) This may take some time</p>
    </div>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="error-container">
    <div className="center-state">
      <h2>Oops! Something went wrong</h2>
      <p style={{ color: 'var(--accent-red)', margin: 'var(--spacing-md) 0' }}>
        {error}
      </p>
      <button 
        className="retry-button"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  </div>
);



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
    return <LoadingState/>;
  }
  if (error) { 
    return <ErrorState error={error}/>;
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
