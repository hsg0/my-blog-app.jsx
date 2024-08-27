import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }, []); // useCallback to memoize the function

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // Add fetchBlogs to dependencies array

  const filteredBlogs = blogs.filter((item) => menu === 'All' || item.category === menu);

  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        {['All', 'Technology', 'Startup', 'Lifestyle'].map((category) => (
          <button
            key={category}
            onClick={() => setMenu(category)}
            className={`py-1 px-4 rounded-sm ${menu === category ? 'bg-black text-white' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {filteredBlogs.map((item) => (
          <BlogItem
            key={item._id} // Use unique ID from the data as key
            id={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;