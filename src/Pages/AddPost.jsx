import { supabase } from "../client";
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
            <form>
                <label htmlFor="title">Enter a title for the post.<span>*</span></label>
            </form>
        </>
    );
};

export default AddPost;