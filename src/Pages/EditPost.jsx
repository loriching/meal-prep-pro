import { supabase } from "../client";
import { useState, useEffect } from "react";
import Post from "../Components/Post.jsx";
import { useParams } from "react-router-dom";
import "./AddPost.css";

const EditPost = () => {
    const {id} = useParams();
    const numericId = parseInt(id, 10);
    const [post, setPost] = useState({title: "", content: "", image: "", votes: 0, comments: []});

    useEffect(() => {
        const currentPost = async() => {
            const { data, error } = await supabase
                .from("Posts")
                .select("*")
                .eq("id", numericId)
                .single();
            
            if (error) {
                console.error("Error fetching from Supabase: ", error);
            }

            setPost({title: data.title, content: data.content, image: data.image, votes: data.votes, comments: data.comments});
        };
        currentPost().catch(console.error);
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    const updatePost = async(event) => {
        event.preventDefault();

        await supabase 
            .from("Posts")
            .update({title: post.title, content: post.content, image: post.image, votes: post.votes, comments: post.comments})
            .eq("id", numericId);
        
            window.location = "/view-posts";
    };

    const deletePost = async(event) => {
        event.preventDefault();

        await supabase
            .from("Posts")
            .delete()
            .eq("id", numericId);
        
            window.location = "/view-posts";
    }

    return (
        <>
            <div>
                <h2>Preview changes to current post:</h2>

                <h4>Title:</h4>
                <p>{post.title}</p>

                <h4>Content:</h4>
                <p>{post.content}</p>

                <h4>Image:</h4>
                {(post.image && post.image.length > 0) && <img className="image-size" src={post.image}></img>}

            </div>
            <br/>
            
            <p><span className="asterisk-mandatory">*</span> If you make changes to your post title but then delete <br/>the changes, please re-enter the previous post title.</p>
            <form>
                <label htmlFor="title">Enter/edit post title: <span className="asterisk-mandatory">*</span></label> <br/>
                <input type="text" id="title" name="title" onChange={handleChange} /> <br/> <br/>

                <label htmlFor="content">Edit post content: </label> <br/>
                <input type="text" id="content" name="content" onChange={handleChange} /> <br/> <br/>

                <label htmlFor="image">Edit post image: </label> <br/>
                <input type="text" id="image" name="image" onChange={handleChange} /> <br/> <br/>

                <input type="submit" value="Submit" onClick={updatePost} disabled={post.title==""} />
                {post.title == "" && <p><span className="asterisk-mandatory">*</span> You must add a title to the post. <span className="asterisk-mandatory">*</span></p>}
            </form>

            <br/>
            <button onClick={deletePost}>Delete</button>
        </>
    );
};

export default EditPost;