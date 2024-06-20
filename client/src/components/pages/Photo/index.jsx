import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useResetComponentMessage } from "../../../hooks/useResetComponentMessage";
import { uploads } from "../../../utils/config";
import { readPhotoById, togglePhotoLike, createPhotoComment, deletePhotoComment } from "../../../slices/photoSlice";
import Message from "../../ui/Message"; 
import PhotoItem from "../../ui/PhotoItem";
import LikeContainer from "../../ui/LikeContainer";
import { BsXLg } from "react-icons/bs";
import "./style.css"; 


export default function Photo() {
    const { id } = useParams(); 
    const { user: authUser } = useSelector(state => state.auth); 
    const { loading, error, photo, message } = useSelector(state => state.photo); 
    const dispatch = useDispatch(); 
    const resetMessae = useResetComponentMessage(dispatch); 
    const [commentText, setCommentText] = useState(""); 

    const handleLike = (photo) => {
        dispatch(togglePhotoLike(photo._id)); 
        resetMessae(dispatch); 
    }

    const handleCreateComment = (e) => {
        e.preventDefault(); 

        const photoObj = {
            _id: photo._id, 
            text: commentText, 
        }
        setCommentText(""); 
        dispatch(createPhotoComment(photoObj)); 
        resetMessae(dispatch); 
    }

    const handleDeleteComment = (photoId, commentId) => {
        console.log("photoID: ", photoId); 
        console.log("commentID: ", commentId); 
        const photoData = {
            photoId, 
            commentId,
        }
        dispatch(deletePhotoComment(photoData)); 
        resetMessae(dispatch);
    }

    useEffect(() => {
        dispatch(readPhotoById(id)); 
    }, [dispatch, id]); 

    // useEffect(() => {
    //     if(photo) {
    //         console.log(photo); 
    //     }
    // }, [photo]); 

    if(loading) {
        return <p>Loading...</p>
    }


    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={authUser} handleLike={handleLike}  />
            <div className="message-container">
                {error && <Message text={error} type="error" />}
                {message && <Message text={message} type="success"  />}
            </div>
            <div className="comments">
                <h3>Comments: {photo.comments && photo.comments.length}</h3>
                <form onSubmit={handleCreateComment}>
                    <textarea
                        name="text" 
                        id="text" 
                        value={commentText || ""} 
                        onChange={e => setCommentText(e.target.value)}
                        maxLength={50}
                        placeholder="Enter a comment..."
                        ></textarea>
                    <button 
                        className="custom-form-btn"
                        type="submit" 
                        disabled={loading}
                        >
                        {loading ? "Loading..." : "Comment"}
                    </button>                        
                </form>
                {photo.comments && photo.comments.length == 0 && <p>There are no comments.</p>}
                {photo.comments && photo.comments.length > 0 && photo.comments.map((comment => (
                    <div key={comment.commentId} className="comment">
                        <div className="author">
                            {comment.userImage && (
                                <img 
                                    src={`${uploads}/users/${comment.userImage}`}
                                    alt={comment.userName}                                    
                                  />
                            )}
                            <Link to={`/users/${comment.userId}`}>
                                <p>{comment.userName}</p>
                            </Link>
                        </div>
                        <p>{comment.text}</p>
                        {authUser._id == comment.userId && (
                            <div className="actions">
                                <BsXLg onClick={() => handleDeleteComment(photo._id, comment.commentId)} />
                            </div>
                        )}
                    </div>
                )))}
            </div>
        </div>  
    )
}