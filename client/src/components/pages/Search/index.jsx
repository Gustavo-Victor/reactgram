import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import { useResetComponentMessage } from "../../../hooks/useResetComponentMessage";
import { togglePhotoLike, searchPhotos } from "../../../slices/photoSlice";
import LikeContainer from "../../ui/LikeContainer";
import PhotoItem from "../../ui/PhotoItem";
import "./style.css";


export default function Search() {
    // const [query, setQuery] = useSearchParams(); 
    const dispatch = useDispatch();
    const resetMessage = useResetComponentMessage(dispatch);
    const query = useQuery();
    const userQueryText = query.get("q");
    const { user } = useSelector(state => state.auth);
    const { photos, loading } = useSelector(state => state.photo);

    const handleLike = (photo) => {
        dispatch(togglePhotoLike(photo._id));
        resetMessage();
    }

    // useEffect(() => {
    //     console.log(query.get("q")); 
    // }, [query]); 

    useEffect(() => {
        dispatch(searchPhotos(userQueryText));
    }, [userQueryText, dispatch]);

    if (loading && !photos && photos.length == 0) {
        return <p>Loading...</p>
    }


    return (
        <div id="search-container" className="photos-container">
            <h2 className="title">Search for {`"`}{userQueryText}{`"`}</h2>
            {!loading && photos && photos.length > 0 && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer
                        handleLike={handleLike}
                        user={user}
                        photo={photo} />
                    <Link className="btn" to={`/photos/${photo._id}`}>See more</Link>
                </div>
            ))}
            {!loading && photos && photos.length == 0 && (
                <p className="no-photos">No results found for your search</p>
            )}
        </div>
    )
}