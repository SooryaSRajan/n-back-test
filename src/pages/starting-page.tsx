import React from 'react';
import {Link} from "react-router-dom";

const StartingPage = () => {
    return (
        <h1 className="flex flex-col justify-center items-center h-screen">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                N-Back test
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center pb-16">
                Test your memory
            </p>
            <Link to="/game">
                <button className="bg-blue-500 text-white ml-4 text-2xl px-32 py-4 hover:bg-sky-700 transition rounded-lg">
                    Get Started
                </button>
            </Link>

        </h1>
    );
};

export default StartingPage;