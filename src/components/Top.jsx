import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import profilePic from './../assets/cruela.jpg';
import Popup from './Popup';
import NewPostForm from './NewPostForm';

const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
        if(ref.current && !ref.current.contains(e.target)){
            callback();
            //console.log("You clicked outside of me!");
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    },[ref, callback]);
}

const Top = () => {
    //dropdown
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const closeDropDown = () => {
        setDropdownVisible(false);
    }

    useOutsideClick(dropdownRef, closeDropDown);

    //popup
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState(null);

    const openPopup = (content) => {
        setPopupContent(content);
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setPopupContent(null);
        setIsPopupOpen(false);
    }

    //navigate
    const navigate = useNavigate();

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    //create post
    const [posts, setPosts] = useState([]);

    const handlePostCreation = async (newPost) => {
        try{
            const response = await axios.post('http://127.0.0.1:5001/create-post', newPost);
            console.log(response.data);

            setPosts([...posts, response.data.post]);
        } catch(error){
            console.log("ERROR creating post!", error);
        }
    };

    return (
        <div className="grid grid-cols-3 items-center p-2">
            <h1 className="font-title text-5xl text-center col-start-2 col-end-3">Denis666</h1>

            <div className="flex justify-end">
                <div className="mr-2" onClick={toggleDropdown} ref={dropdownRef}>
                    <img alt="Profile" className="w-24 h-24 rounded-full p-2 mr-2" src={profilePic}/>
                    {dropdownVisible && (
                        <div className="absolute right-3 mt-2 bg-gray-100 border rounded shadow">

                            <button 
                                className="bloc w-32 px-4 py-2 whitespace-nowrap text-gray-700 hover:bg-gray-200"
                                onClick={() => navigate('/admin')}
                            >Admin Panel</button>

                            <button 
                                className={`block w-32 px-4 py-2 whitespace-nowrap text-gray-700 ${isAuthenticated ? 'bg-gray-100 hover:bg-gray-200' : 'bg-red-200 hover:bg-red-300'}`}
                                disabled={!isAuthenticated}
                                onClick={() => openPopup(
                                    <NewPostForm onCreatePost={handlePostCreation} onClose={closePopup}/>
                                )}>Create Post</button>
                        </div>
                    )}
                </div> 
            </div>

            {isPopupOpen && (
                <Popup isOpen={isPopupOpen} onClose={closePopup} content={popupContent}></Popup>
            )}                        
        </div>
    )
};

export default Top;