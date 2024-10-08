import React from 'react';
import {Link} from "react-router-dom";

const StartingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white pb-10">
                N-Back test
            </h1>
            <Link to="/game">
                <button className="bg-blue-500 text-white ml-4 text-2xl px-32 py-4 hover:bg-sky-700 transition rounded-lg">
                    Get Started
                </button>
            </Link>
        </div>
    );
};

export default StartingPage;