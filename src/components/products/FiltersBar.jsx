import { useState, useEffect } from 'react';
import { Button } from '../ui/Button.jsx';

/**
 * Filters Bar Component
 * Search, sort, and filter controls for products
 */
export function FiltersBar({ 
  onSearch, 
  onSort, 
  onFilterTag, 
  onReset,
  filters 
}) {
  const [searchInput, setSearchInput] = useState(filters?.search || '');
  const [selectedSort, setSelectedSort] = useState('title-asc');
  const [selectedTag, setSelectedTag] = useState(filters?.tag || 'all');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchInput);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, onSearch]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    
    const [sortBy, order] = value.split('-');
    if (onSort) {
      onSort(sortBy, order);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    if (onFilterTag) {
      onFilterTag(tag);
    }
  };

  const handleReset = () => {
    setSearchInput('');
    setSelectedSort('title-asc');
    setSelectedTag('all');
    if (onReset) {
      onReset();
    }
  };

  const tags = [
    { id: 'all', label: 'All Products' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'snack', label: 'Snacks' },
    { id: 'rice', label: 'Rice & Grains' },
    { id: 'oil', label: 'Cooking Oil' },
    { id: 'beverage', label: 'Beverages' }
  ];

  return (
    <div className="filters-bar">
      <div className="filters-bar__container">
        {/* Search Bar */}
        <div className="filters-bar__search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="filters-bar__search-icon">
            <path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search groceries..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="filters-bar__search-input"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="filters-bar__search-clear"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="filters-bar__sort">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="filters-bar__sort-icon">
            <path d="M3 6H17M3 10H12M3 14H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="filters-bar__sort-select"
          >
            <option value="title-asc">Name: A-Z</option>
            <option value="title-desc">Name: Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>

        {/* Reset Button */}
        <Button
          variant="secondary"
          size="small"
          onClick={handleReset}
          className="filters-bar__reset"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '4px' }}>
            <path d="M2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C5.94045 14 4.11701 12.9124 3.07349 11.25M2 12V8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Reset
        </Button>
      </div>

      {/* Tag Filters */}
      <div className="filters-bar__tags">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className={`filters-bar__tag ${selectedTag === tag.id ? 'filters-bar__tag--active' : ''}`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}

