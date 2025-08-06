import "./Post.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Post = (props) => {
    const [showImage, setShowImage] = useState(false);

    const handleImage = (event) => {
        setShowImage(!showImage);
    }

    return (
        <>
            <div className="post">
                {(props.image && props.image.length > 0) && (showImage ? 
                <button type="button" onClick={handleImage}>Hide Image</button>
                : <button type="button" onClick={handleImage}>Show Image</button>)}

                <p>Created at: {props.created_at}</p>
                <h2>{props.title}</h2>
                {(props.image && props.image.length > 0 && showImage) && <img src={props.image} className="post-image"></img>} 
                <p>{props.content}</p>
                <p>Votes: {props.votes}</p>

                 <Link to={'/post-info/' + props.id}>
                    <button type="button">View Full Post</button>
                </Link>

                <Link to={'/edit-post/' + props.id}>
                    <button type="button">Edit/Delete Post</button>
                </Link>
            </div>
            
        </>
    );
};

export default Post;