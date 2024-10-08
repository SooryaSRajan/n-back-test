import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import StartingPage from "./pages/starting-page";
import GamePage from "./pages/game-page";
import Results from "./pages/results";

const router = createBrowserRouter([
    {
        path: "/",
        element: <StartingPage/>,
    },
    {
        path: "/game",
        element: <GamePage/>
    },
    {
        path: "/results",
        element: <Results/>
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
