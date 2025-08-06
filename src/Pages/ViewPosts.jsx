import "./ViewPosts.css";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import Post from "../Components/Post.jsx";
import { Link } from "react-router-dom";
import "./ViewPosts.css";

const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [sort, setSort] = useState("created_at"); // created_at or votes
    const [query, setQuery] = useState("")

    const handleSort = (event) => {
        const {name, value} = event.target;
        setSort(value);
    };

    useEffect(() => {
        const fetchPosts = async() => {
            if (query && query.length > 0) {
                const {data} = await supabase
                    .from("Posts")
                    .select()
                    .ilike("title", `%${query}%`)
                    .order(`${sort}`, {ascending: true});
                setPosts(data);
            }
            else {
                const {data} = await supabase
                    .from("Posts")
                    .select()
                    .ilike("title", `%${query}%`)
                    .order(`${sort}`, {ascending: true});
                setPosts(data);
            }
        };
        fetchPosts();
    }, [sort, query]);

    return (
        <>
            <h4>Search for posts by title:</h4>
            <input type="text" placeholder="Search posts" value={query} onChange={(e) => {setQuery(e.target.value);}} />

            <h4>Pick how you want to sort the posts (ascending):</h4>
            <input type="radio" id="created_at" name="sort" value="created_at" onClick={handleSort} />
            <label htmlFor="created_at">Sort by creation date</label> <br/>
            <input type="radio" id="votes" name="sort" value="votes" onClick={handleSort} />
            <label htmlFor="votes">Sort by number of upvotes</label> <br/>

            {posts && posts.length > 0 ? 
            [...posts]
            .map((p,index) =>
                <div className="post-layout">
                    <Post
                        key={p.id}
                        id={p.id}
                        created_at={p.created_at}
                        title={p.title}
                        content={p.content}
                        image={p.image}
                        votes={p.votes}
                        comments={p.comments}
                    />
                </div>)
            : <h2>No Posts Yet</h2>}
        </>
    );
};

export default ViewPosts;