import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Post from './Post';

const Hero = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:5001/posts')
            // console.log(response.data);
            // console.log(response.data.posts);
            setPosts(response.data.posts);
        }catch(error){
            console.error('ERROR fetching posts', error);
        }
    };

    fetchPosts();
    
    return (
        <div>
            {posts && posts.map((post) => (
                <Post key={post._id} title={post.title} body={post.body} image={post.image}/>
            ))}
        </div>
    )
};


export default Hero;