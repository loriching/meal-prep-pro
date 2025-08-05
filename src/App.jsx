import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header.jsx";
import Home from "./Pages/Home.jsx";
import NoMatch from "./Pages/NoMatch.jsx";

import AddPost from "./Pages/AddPost.jsx";
import ViewPosts from "./Pages/ViewPosts.jsx";

import './App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />}>
                        <Route index={true} element={<Home />}/>
                        <Route path="/view-posts" element={<ViewPosts />}/>
                        <Route path="/add-post" element={<AddPost />}/>
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
