import { Link, Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="header">
                <h4>Jump to:</h4>
                <nav>
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/view-posts">View Posts</Link></div>
                    <div><Link to="/add-post">Add Posts</Link></div>
                </nav>
            </div>
            <Outlet/>
        </>
    );
};

export default Header;