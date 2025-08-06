import { supabase } from "../client";
import { useState } from "react";
import "./AddPost.css";
const AddPost = () => {
    const [post, setPost] = useState({title: "", content: "", image: "", votes: 0, comments: []});

    const createPost = async(event) => {
        event.preventDefault();

        await supabase 
            .from("Posts")
            .insert({title: post.title, content: post.content, image: post.image, votes: post.votes, comments: post.comments})
            .select();
        
            window.location = "/view-posts";
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    return (
        <>
            <br/>
            <p><span className="asterisk-mandatory">*</span> required.</p>
            <form>
                <label htmlFor="title">Enter a title for the post. <span className="asterisk-mandatory">*</span></label> <br/>
                <input type="text" id="title" name="title" onChange={handleChange} /> <br/> <br/>

                <label htmlFor="content">Enter some text for your post.</label> <br/>
                <input type="text" id="content" name="content" onChange={handleChange} /> <br/> <br/>

                <label htmlFor="image">Enter an image link for the post.</label> <br/>
                <input type="text" id="image" name="image" onChange={handleChange} /> <br/> <br/>

                <input type="submit" value="Submit" onClick={createPost} disabled={post.title == ""} />
                {post.title == "" && <p><span className="asterisk-mandatory">*</span> You must add a title to the post. <span className="asterisk-mandatory">*</span></p>}
            </form>
        </>
    );
};

export default AddPost;