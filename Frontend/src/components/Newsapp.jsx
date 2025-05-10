import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import NCard from './NCard.jsx';

const Newsapp = () => {
  const API_KEY = "1ced49a38e764f3481dfc8a45871535c"; 
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);

  const getData = async () => {
    console.log("getData called with search term:", search); // Log when getData is called
    const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
    if (!response) {
      console.log("getData: No response from API");
      return;
    }
    const jsonData = await response.json();
    console.log(jsonData);
    
    console.log("getData: API response received:", jsonData.articles ? jsonData.articles.length : 0, "articles"); // Log the number of articles received
    setNewsData(jsonData.articles);
  };

  useEffect(() => {
    console.log("useEffect triggered because 'search' changed:", search); // Log when useEffect runs
    getData();
  }, [search]); // The effect will run whenever the 'search' state changes

  useEffect(() => {
    console.log("Component mounted. Initial getData call."); // Log on mount
    getData(); // Initial fetch
  }, []);

  const handleCategoryClick = (category) => {
    console.log("Category button clicked:", category); // Log button click
    setSearch(category); // Update the search state
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search button clicked."); // Log search button click
    getData();
  };

  return (
    <div>
      <nav>
        <div>
          <h1 className='text-2xl font-bold'>MockPrep Daily Magzine</h1>
        </div>
        <div className="searchBar">
          <input
            type="text"
            onChange={handleInputChange}
            value={search}
            placeholder="Search Current Affairs"
          />
          <i class="ri-search-line" onClick={handleSearchClick}></i>
        </div>
      </nav>
      <div>
        <p className='head'>
          Stay Updated with Current Affairs
        </p>
      </div>

      <div className="categoryBtn mt-5 w-full">
        <Button className='button' variant="outlined" onClick={() => handleCategoryClick('Sports')}>Sports</Button>
        <Button className='button' variant="outlined" onClick={() => handleCategoryClick('Politics')}>Politics</Button>
        <Button className='button' variant="outlined" onClick={() => handleCategoryClick('Entertainment')}>Entertainment</Button>
        <Button className='button' variant="outlined" onClick={() => handleCategoryClick('Health')}>Health</Button>
        <Button className='button' variant="outlined" onClick={() => handleCategoryClick('Technology')}>Technology</Button>
      </div>

      <div>
        {newsData ? <NCard data={newsData} /> : <p>Loading News...</p>}
      </div>
    </div>
  );
};

export default Newsapp;