import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-container">
      <h1>Our Food Blog</h1>
      <div className="blog-posts">
        <div className="blog-post">
         
          <h2>Delicious Indian Cuisine</h2>
          <p className="post-date">March 15, 2024</p>
          <p>Explore the rich flavors and spices of traditional Indian dishes. From butter chicken to biryani, discover the secrets behind these beloved recipes.</p>
        </div>

        <div className="blog-post">
          <h2>Behind the Kitchen</h2>
          <p className="post-date">March 10, 2024</p>
          <p>Take a peek into our restaurant's kitchen and learn about our commitment to quality ingredients and exceptional service.</p>
        </div>

        <div className="blog-post">
          <h2>Cooking Tips & Tricks</h2>
          <p className="post-date">March 5, 2024</p>
          <p>Learn professional cooking techniques from our expert chefs. Enhance your culinary skills with these simple yet effective tips.</p>
        </div>
      </div>
    </div>
  );
};

export default Blog;