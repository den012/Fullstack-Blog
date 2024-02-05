import { useState } from 'react';

const NewPostForm = ({onCreatePost, onClose}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const newPost = {title, body, image};
            await onCreatePost(newPost);

            onClose();
        }catch(err){
            setError(err.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col text-xl justify-center items-center">
            <h1 className="text-4xl font-title mb-4">NEW POST</h1>
            <input
                type="text"
                value={title}
                placeholder={"Enter your post title"}
                className="w-64 mb-4 pl-1"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={body}
                placeholder={"Enter your post desription"}
                className="mb-4 pl-1 max-h-36 min-h-10"
                onChange={(e) => setBody(e.target.value)}
            />
            <h1 className="text-2xl mb-4 font-bold">Image automatically generated⛰️</h1>
            <p className="text-m text-red-500">{error}</p>
            <button
                type="submit"
                className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded"
            >Submit</button>
        </form>
    );
};

export default NewPostForm;