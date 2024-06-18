import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { uploads } from "../../../utils/config";
import { readPhotoById, togglePhotoLike } from "../../../slices/photoSlice";
import Message from "../../ui/Message"; 
import PhotoItem from "../../ui/PhotoItem";
import LikeContainer from "../../ui/LikeContainer";
import "./style.css"; 


export default function Photo() {
    const { id } = useParams(); 
    const { user: authUser } = useSelector(state => state.auth); 
    const { loading, error, photo, message } = useSelector(state => state.photo); 
    const dispatch = useDispatch(); 
    
    const handleLike = (photo) => {
        dispatch(togglePhotoLike(photo._id)); 
    }

    useEffect(() => {
        dispatch(readPhotoById(id)); 
    }, [dispatch, id]); 

    useEffect(() => {
        if(photo) {
            console.log(photo); 
        }
    }, [photo]); 

    if(loading) {
        return <p>Loading...</p>
    }


    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={authUser} handleLike={handleLike}  />
        </div>  
    )
}