import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import { readAllPhotos, togglePhotoLike } from "../../../slices/photoSlice";
import { useResetComponentMessage } from "../../../hooks/useResetComponentMessage"; 
import LikeContainer from "../../ui/LikeContainer";
import PhotoItem from "../../ui/PhotoItem";  
import "./style.css"; 


export default function Home() {
    const { user } = useSelector(state => state.auth);  
    const { loading, photos } = useSelector(state => state.photo);
    const dispatch = useDispatch(); 
    const resetMessage = useResetComponentMessage(dispatch);
    
    const handleLike = (photo) => {
        dispatch(togglePhotoLike(photo._id)); 
        resetMessage(); 
    }

    useEffect(() => {
        dispatch(readAllPhotos()); 
    }, [dispatch]); 

    // useEffect(() => {
    //     if(photos) {
    //         console.log(photos);
    //     }
    // }, [photos])

    if(loading && !photos || photos.length == 0) {
        return <p>Loading...</p>
    }

    return (
        <div id="home">
            {photos && photos.length > 0 && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer 
                        handleLike={handleLike}
                        user={user}
                        photo={photo}  />
                    <Link className="btn" to={`/photos/${photo._id}`}>See more</Link>
                </div>                
            ))}
            {!loading && photos.length == 0 && (
                <h2 className="no-photos">There are no photos published. <Link to={`/users/${user._id}`}>Click here</Link></h2>
            )}
        </div>
    )
}