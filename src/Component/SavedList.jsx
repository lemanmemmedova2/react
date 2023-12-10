
import React from 'react';
import { useParams } from 'react-router-dom';
import './SavedList.css';

const SavedList = ({ savedList }) => {
  const { listName } = useParams();
  const list2 = decodeURIComponent(listName);

  return (
    <div className='saved'>
      <h2>List: {list2}</h2>
      <ul>
        {savedList.map((movie, index) => (
          <li key={index}>{movie.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedList;