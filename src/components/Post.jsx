import React from 'react';

const Post = ({ _id, title, body, image}) => {
    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center border p-4 mb-4 shadow rounded" style={{width: '700px', height: '630px'}}>
                <div>
                    <h2 className="text-3xl font-bold mb-2">{title}</h2>
                    <p className ="text-xl text-gray-700 mb-5">{body}</p>
                    <img className="mb-2" style={{width: '500px', height: "400px"}}  alt="Image" src={image}/>

                     {/*Action Buttons*/}
                    <div className="flex items-center space-x-10 text-3xl">
                        <div>
                            <p>122</p>
                            <button>❤️</button>
                        </div>
                        <div>
                            <p>10</p>
                            <button>💬</button>
                        </div>
                        <div>
                            <p>2</p>
                            <button>➡️</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Post;