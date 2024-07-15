import axios from 'axios';
import React, { useState } from 'react';

const PlayGround = () => {

    const [post, setPost] = useState([]);

    const getPosts = () => {
        axios.get(wpApiSettings.root + 'wp-client-management/v1/posts/', {
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            },
        })
        .then((response) => {
            console.log(response.data);
            setPost(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h1>PlayGround</h1>
            <button onClick={getPosts}>Click me to get all posts</button>
        </div>
    );
};

export default PlayGround;
