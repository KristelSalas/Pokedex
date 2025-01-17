import { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.css';

const TIMEOUT_TIME = 500;

const SearchBar = ({ onSearch, setSearchTerm, searchTerm }) => {
  const [isExpanded, setIsExpanded] = useState(searchTerm !== '');
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      onSearch(value);
    }, TIMEOUT_TIME);

    setDebounceTimeout(newTimeout);
  };

  return (
    <div className="search-bar-container">
      <InputGroup className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
        <Button variant="outline-secondary" onClick={handleToggle} className="search-icon">
          <FaSearch />
        </Button>
        {isExpanded && (
          <FormControl
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleChange}
            aria-label="Buscar"
            className="search-input"
          />
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;
