import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './Component/Search';
import MovieDetails from './Component/MovieDetails';
import Header from './Component/Header';
import List from './Component/List';
import SavedList from './Component/SavedList'; 
import './App.css';

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [listName, setListName] = React.useState('');
  const [saved, setSaved] = React.useState(false);

  const addList = (movie) => {
    const m = movies.some((e) => e.Title === movie.Title);

    if (!saved && !m) {
      setMovies([...movies, movie]);
    }
  };

  const remove = (index) => {
    const d = [...movies];
    d.splice(index, 1);
    setMovies(d);
  };

  const save = (name) => {
    setListName(name);
    setSaved(true);
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="react/"
            element={
              <div className="div">
                <div>
                  <Search onAddToList={addList} isListSaved={saved} />
                  <MovieDetails />
                </div>
                <div>
                  <List
                    selectedMovies={movies}
                    onRemoveFromList={remove}
                    onSaveListName={save}
                  />
                </div>
              </div>
            }
          />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/saved-movies/:listName" element={<SavedList savedList={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;