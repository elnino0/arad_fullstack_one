import React, { useState, useEffect, useRef } from 'react';

const Autocomplete = ({ options, onSelect }) => {
  const [value, setValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (filteredOptions.length > 0) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(0, value.length);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredOptions, value]);

  useEffect(() => {
    const filterOptions = () => {
      if (value === '') {
        setFilteredOptions([]);
      } else {
        const filteredOptions = options.filter((option) => option.includes(value));

        setFilteredOptions(filteredOptions);
      }
    };

    filterOptions();
  }, [value, options]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (option) => {
    setValue(option);
    setShowDropdown(false);
    onSelect(option);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100); // Delay to prevent hiding on quick clicks
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        ref={inputRef}
      />
      {showDropdown && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;