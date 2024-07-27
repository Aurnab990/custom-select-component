import React from 'react';
import './App.css';
import SelectItems from './SelectItems';

function App() {
  const options = [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'orange', label: 'Orange' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'broccoli', label: 'Broccoli' },
        { value: 'spinach', label: 'Spinach' },
      ],
    },
  ];

  return (
    <div className="App">
      <h1>Custom Select Component</h1>
      <SelectItems
        options={options}
        isMulti={false}
        isClearable={true}
        isSearchable={true}
        placeholder="Select a flavor"
      />
      <SelectItems
        options={options}
        isMulti={true}
        isClearable={true}
        isSearchable={true}
        placeholder="Select multiple options"
      />
    </div>
  );
}

export default App;
