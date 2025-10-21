import { useState } from 'react';
import '../styles/CategoryFilter.css';

const CategoryFilter = ({ categories, selected, onSelect }) => {
  return(    
    <div className="category-filter-container">
      <h2>Filter by Category</h2>
      <div className="category-filter">
        <button
          className={`filter-btn ${selected === null ? 'active' : ''}`}
          onClick={() => onSelect(null)}
        >
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${selected === category.name ? 'active' : ''}`}
            onClick={() => onSelect(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
    );
};

export default CategoryFilter;