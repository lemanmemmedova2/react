import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

const Search = ({ onAddToList, isListSaved }) => {
  const [first, getFirst] = useState('');
  const [text, setText] = useState([]);
  const [third, setThird] = useState(null);

  useEffect(() => {
    fetch('https://www.omdbapi.com/?s=marvel&apikey=a05dbfd')
      .then((res) => res.json())
      .then((a) => {
        setText(a.Search);
      });
  }, []);

  const button = () => {
    if (!first.trim()) {
      return;
    }
    check();
  };

  const main = (e) => {
    getFirst(e.target.value.toLowerCase().trim(''));
  };

  const add = (movie) => {
    if (!isListSaved) {
      onAddToList(movie);
    }
  };

  const check = () => {
    fetch(`https://www.omdbapi.com/?s=${first}&apikey=a05dbfd`)
      .then((res) => res.json())
      .then((a) => {
        if (a.Search) {
          setText(a.Search);
          setThird(null); 
        } else {
          setText([]); 
          setThird('No results found.'); 
        }
      });
  };

  return (
    <div className="box">
      <label>Filmin adini yazin:</label> <br />
      <input onChange={main} className="main" placeholder="Axtarin..."></input>
      <button className='button1' onClick={button}>Axtar</button>
      {third && <p >{third}</p>}
      {text.map((a, b) => (
        <div className="search" key={b}>
          <p>
            {b + 1}.{a.Title}
          </p>
          <img src={a.Poster} alt="img" />
          <Link to={`/details/${a.imdbID}`}>
            <button className='button2'>Details</button>
          </Link>
          <button
            className='button3'
            onClick={() => add(a)}
            disabled={isListSaved}
          >
            {isListSaved ? 'Added' : 'Add to List'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Search;
