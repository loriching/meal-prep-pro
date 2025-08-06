import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect } from "react";
import "./PostInfo.css";

const PostInfo = (props) => {
    const { id } = useParams();
    const numericId = parseInt(id, 10);
    const [post, setPost] = useState({title: "", content: "", image: "", votes: 0, comments: []});
    const [votes, setVotes] = useState(props.votes);
    const [comments, setComments] = useState(props.comments);
    const [comment, setComment] = useState("");

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
            setVotes(data.votes);
            setComments(data.comments || []);
        }
        currentPost().catch(console.error);
    }, [id]);


    const addVote = async(event) => {
        event.preventDefault();

        await supabase  
            .from("Posts")
            .update({votes: votes + 1})
            .eq("id", numericId);

        setVotes((v) => v + 1);
    };

    const handleComment = async(event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from("Posts")
            .select("comments")
            .eq("id", numericId)
            .single();
        
        if (error) {
            console.error("Error fetching from Supabase: ", error);
        }

        const updatedComments = [...(data.comments || []), comment];

        const { error: e } = await supabase
            .from("Posts")
            .update({comments: updatedComments})
            .eq("id", numericId);
        
        if (e) {
            console.error("Error fetching from Supabase: ", e);
        };
        

        setComments(updatedComments);
        setComment("");
        
    };

    const getComment = (event) => {
        setComment(event.target.value);
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
            <h2>{post.title}</h2>
            {(post.content && post.content.length > 0) ? <p>{post.content}</p> : <p>No post content.</p>}
            {(post.image && post.image.length > 0) && <img src={post.image} className="post-info-image"></img>}

            <br></br>
            <button type="button" onClick={addVote}>👍 {votes}</button>

            <form>
                <label htmlFor="comment"></label> <br/>
                <input type="text" id="comment" name="comment" value={comment} onChange={getComment}/> <br/>

                <button type="submit" onClick={handleComment}>Add Comment</button>
            </form>

            {comments && comments.length > 0 ? 
            (<>
                <h3>Comments:</h3>
                {[...comments].map((c, i) =>
                (<div className="comment-layout">
                    <p>{c}</p>
                </div>))}
            </>)
            
            : <h2>No comments yet!</h2>}

            <button type="button" onClick={deletePost}>Delete Post</button>
        </>
    );
};

export default PostInfo;