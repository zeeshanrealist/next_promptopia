'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map(post => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))
      }
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
    setFilteredPosts(data);
  }
  
  const getFilteredPosts = () => {
    if (!searchText) {
      return;
    }
    const searchTerm = searchText.toLowerCase(); // case-insensitive search text
    const filteredPosts = posts.filter(post => (
      post.tag.toLowerCase().includes(searchTerm) ||
      post.prompt.toLowerCase().includes(searchTerm) ||
      post.creator.username.toLowerCase().includes(searchTerm)));
    setFilteredPosts(filteredPosts);
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (!e.target.value) {
      setFilteredPosts(posts);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      getFilteredPosts();
    }, 500);
    return () => clearTimeout(id);
  }, [searchText]);

  const handleTagClick = (searchTag) => {
    setSearchText(searchTag);
    const filteredPosts = posts.filter(post => post.tag.toLowerCase().includes(searchTag.toLowerCase()));
    setPosts(filteredPosts);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed;
