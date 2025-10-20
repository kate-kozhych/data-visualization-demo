import { useData } from './hooks/useData'
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const { categories, questions, loading } = useData();

  if (loading) {
    return <div>Loading...</div>;
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

      <h2>Questions ({questions.length})</h2>
      <pre>{JSON.stringify(questions[0], null, 2)}</pre>
    </div>
  );
}

export default App;
