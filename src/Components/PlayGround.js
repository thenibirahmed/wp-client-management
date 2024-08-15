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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const getUsers = () => {
        axios.get(wpApiSettings.root + 'wp-client-management/v1/users', {
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            },
        })
        .then((response) => {
            console.log(response.data);
            setPost(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const getClients = () => {
        axios.get(wpApiSettings.root + 'wp-client-management/v1/clients', {
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            },
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const getSinglePost = () => {
        axios.get(wpApiSettings.root + 'wp-client-management/v1/post/1', {
            headers: {
                'X-WP-Nonce': wpApiSettings.nonce
            },
        })
        .then((response) => {
            console.log(response.data);
            setPost(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const getTest = () => {
        axios.put(wpApiSettings.root + 'wp-client-management/v1/client/update/2',
            {
                name: 'final update',
                phone: '0525252',
                city: 'fianl update',
                address: 'fianl update',
                state: 'fianl update',
                zip: 'fianl update',
                country: 'fianl update',
                role: 'fianl update',
                organization: 'fianl update',
                designation: 'fianl update',
                status: 'fianl update',
            },
            {
                headers: {
                    'X-WP-Nonce': wpApiSettings.nonce,
                    // 'Content-Type' : 'application/json'
                }
            }
        )
        .then((response) => {
            console.log(response.data);
            setPost(response.data);
        })
        .catch((error) => {
            console.log('Error:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <div>
            <h1>PlayGround</h1>
            <button onClick={getPosts}>Click me to get all posts</button> <br/><br/>
            <button onClick={getUsers}>Click me to get all users</button> <br/><br/>
            <button onClick={getSinglePost}>Click me to get single post</button> <br/><br/>

            <button onClick={getTest}>Testing</button><br/>
        </div>
    );
};

export default PlayGround;
