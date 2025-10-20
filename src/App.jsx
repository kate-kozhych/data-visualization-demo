import { useData } from './hooks/useData'
import { useState, useEffect } from 'react';
import './App.css'

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
    <div>
      <h1>Trivia Visualization</h1>
      
      <h2>Categories ({categories.length})</h2>
      <ul>
        {categories.map(ctgrs => (
          <li key={ctgrs.id}>{ctgrs.name}</li>
        ))}
      </ul>

      <h2>Questions ({allQuestions.length})</h2>
      <pre>{JSON.stringify(allQuestions[0], null, 2)}</pre>
    </div>
  );
}

export default App;
