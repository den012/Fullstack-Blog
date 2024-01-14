import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import EmojiFloat from './EmojiFloat';

import '../App.css';

const AdminLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //auth check
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(storedIsAuthenticated);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try { 
            const response = await axios.post('http://localhost:5001/login', {
                username, password,
            });

            if (response.status === 200) {
                console.log(response.data);
                console.log('Login Success');
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                await navigate('/');
            } else {
                console.log('Login Failed');
                setError('Invalid credentials');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Login Failed');
                setError('Invalid credentials');
            } else {
                console.log('Error during login', error.message);
                setError('Error during login');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {!isAuthenticated ? (
            <div className="z-10 flex flex-col justify-center items-center">
                <h1 className="font-title text-5xl mb-10">ADMIN ACCOUNT</h1>
                <form onSubmit={handleLogin} className="z-10 flex flex-col justify-center items-center">
                    <div className="flex flex-col mb-2">
                        <input
                            className="text-xl py-2 mr-4 rounded pl-4 mb-3" 
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="text-xl py-2 mr-4 rounded pl-4" 
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-l font-bold mb-4">{error}</p>}
                    <button  
                        className="text3-xl bg-green-600 hover:bg-green-700 text-white px-3 py-3 font-bold rounded"
                        type="submit"
                    >Login</button>
                </form>
            </div> ) : (
                <>
                    <div className="z-10 flex flex-col justify-center items-center">
                        <h1 className="font-title text-4xl mb-7">YOU ARE ALREADY LOGGED IN</h1>
                        <button  
                            className="text3-xl bg-blue-600 hover:bg-blue-900 text-white px-3 py-3 font-bold rounded"
                            onClick={handleLogout}
                        >Logout</button>
                    </div>
                </>
                )}
            <EmojiFloat className="z-0" />
        </div>
    )
};

export default AdminLogin;