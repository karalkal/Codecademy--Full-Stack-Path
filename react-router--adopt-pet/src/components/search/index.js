import React, { useRef } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';


const Search = () => {

  const navigate = useNavigate();

  const searchInputRef = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    const searchQuery = {
      name: searchInputRef.current.value
    }

    const query = createSearchParams(searchQuery);    // will return URLSearchParams object

    // navigate(`/search?name=${searchQuery.name}`);
    // navigate(`/search?${query}`);     // can use URLSearchParams objects straight away
    // and the correct way is:
    navigate({
      pathname: "/search",
      search: `?${query}`,
    })
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
