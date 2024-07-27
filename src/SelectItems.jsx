import React, { useState } from 'react';
import './SelectItems.css';

const SelectItems = ({ options, isMulti, isClearable, isSearchable, placeholder }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        if (isMulti) {
            if (selectedValues.includes(option)) {
                setSelectedValues(selectedValues.filter((val) => val !== option));
            } else {
                setSelectedValues([...selectedValues, option]);
            }
        } else {
            setSelectedValues([option]);
            setIsOpen(false);
        }
    };

    const handleClear = () => {
        setSelectedValues([]);
        if (isSearchable) {
            setSearchTerm('');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const filteredOptions = options.filter((option) =>
        typeof option === 'string'
            ? option.toLowerCase().includes(searchTerm.toLowerCase())
            : option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="custom-select">
            <div className="select-box" onClick={toggleDropdown}>
                {selectedValues.length === 0 ? (
                    <div className="placeholder">{placeholder}</div>
                ) : (
                    <div className="selected-values">
                        {selectedValues.map((val, idx) => (
                            <span key={idx} className="selected-value">
                                {typeof val === 'string' ? val : val.label}
                                {isClearable && <button onClick={() => handleSelect(val)}>x</button>}
                            </span>
                        ))}
                    </div>
                )}
                <button className="dropdown-indicator">{isOpen ? '▲' : '▼'}</button>
            </div>
            {isOpen && (
                <div className="options-list">
                    {isSearchable && (
                        <input
                            type="text"
                            className="search-box"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search..."
                        />
                    )}
                    {filteredOptions.map((option, idx) =>
                        typeof option === 'string' ? (
                            <div
                                key={idx}
                                className={`option ${selectedValues.includes(option) ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </div>
                        ) : (
                            <div key={idx} className="option-group">
                                <div className="group-label">{option.label}</div>
                                {option.options.map((subOption, subIdx) => (
                                    <div
                                        key={subIdx}
                                        className={`option ${selectedValues.includes(subOption) ? 'selected' : ''}`}
                                        onClick={() => handleSelect(subOption)}
                                    >
                                        {subOption.label}
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            )}
            {isClearable && selectedValues.length > 0 && (
                <button className="clear-button" onClick={handleClear}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default SelectItems;