import React from 'react';
import './SearchBar.css';

export default function SearchName({ value, setValue, fetchname }) {

  const fetch = (e) => {
    if (e.code === 'Enter') {
      fetchname();
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="UserName"
      value={value}
      onChange={handleChange
      }
      onKeyUp={(event) => {
        fetch(event)
      }}
      style={{ padding: '5px', width: '150px', borderRadius: '10px', border: '3px solid #ccc', fontSize: '15px' }}
    />
  );
};



export function SearchStatus({ onSearch ,status ,fetchstatus }) {

    const fetch = (e) => {
    if (e.code === 'Enter') {
      fetchstatus();
    }
  };

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Status"
      value={status}
      onChange={handleChange}
      onKeyUp={(event) =>{
        fetch(event)
      }}
      style={{ padding: '5px', width: '150px', borderRadius: '10px', border: '3px solid #ccc', fontSize: '15px' }}
    />
  );
};


export function SearchPriority({ onSearch, priority, fetchpriority }) {

  const fetch = (e) => {
    if (e.code === 'Enter') {
      fetchpriority();
    }
  };

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Prioruty"
      value={priority}
      onChange={handleChange}
      onKeyUp={(event) => {
        fetch(event)
      }}
      style={{ padding: '5px', width: '150px', borderRadius: '10px', border: '3px solid #ccc', fontSize: '15px' }}
    />
  );
};



export function SearchDescription({ onSearch, title , fetchtitle}) {

  const fetch = (e) =>{
    if(e.code ==='Enter')
      fetchtitle();
  }
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Title/Description"
      value={title}
      onChange={handleChange}
      onKeyUp={(e) =>{
        fetch(e)
      }}
      style={{ padding: '5px', width: '240px', borderRadius: '10px', border: '3px solid #ccc', fontSize: '15px' }}
    />
  );
};


export function SearchDate({ onSearch, due_date, fetchDate}) {

  const fetch = (e) =>{
    if(e.code ==='Enter')
      fetchDate();
  }
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Due_Date"
      value={due_date}
      onChange={handleChange}
      onKeyUp={(e) =>{
        fetch(e)
      }}
      style={{ padding: '5px', width: '150px', borderRadius: '10px', border: '3px solid #ccc', fontSize: '15px' }}
    />
  );
};

