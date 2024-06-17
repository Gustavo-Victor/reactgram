import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { uploads } from "../../../utils/config";
import { readPhotoById } from "../../../slices/photoSlice";
import Message from "../../ui/Message"; 
import PhotoItem from "../../ui/PhotoItem";
import "./style.css"; 


export default function Photo() {
    const { id } = useParams(); 
    const { user: authUser } = useSelector(state => state.auth); 
    const { loading, error, photo, message } = useSelector(state => state.photo); 
    const dispatch = useDispatch(); 

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
        </div>  
    )
}