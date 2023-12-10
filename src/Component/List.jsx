import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import x from './X.jpg';

export const List = ({ selectedMovies, onRemoveFromList, onSaveListName }) => {
  const [list, setList] = useState('');
  const [list1, setList1] = useState(false);
  const [saved, setSaved] = useState(false);

  const remove = (index) => {
    if (!list1) {
      onRemoveFromList(index);
    }
  };

  const save = () => {
    if (list.trim() !== '') { 
      onSaveListName(list);
      setList1(true);
      setSaved(true);
    }
  };

  return (
    <div className='list'>
      <label>List name: </label>
      <input type="text" value={list} onChange={(e) => setList(e.target.value)} disabled={list1}
      /> <br></br>
      <button className='bottom' onClick={save} disabled={list1 || list.trim() === ''}>
        {list1 ? 'List Saved' : 'Save'}
      </button>
      {list1 && saved && (
        <Link to={`/saved-movies/${encodeURIComponent(list)}`} >
          My movies
        </Link>
      )}
      <ul>
        {selectedMovies.map((movie, index) => (
          <li key={index}> 
            {movie.Title}{' '}
            <img src={x} alt='remove' onClick={() => remove(index)} disabled={list1}>
              </img>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;


