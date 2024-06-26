import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploads } from "../../../utils/config";
import { useParams, Link } from "react-router-dom";
import { readUserDetails } from "../../../slices/userSlice";
import {
    createUserPhoto,
    readUserPhotos,
    resetMessage,
    deleteUserPhoto,
    updateUserPhoto
} from "../../../slices/photoSlice";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import Message from "../../ui/Message";
import "./style.css";


export default function Profile() {
    const { id } = useParams();
    const { user, loading } = useSelector(state => state.user);
    const { user: currentUser } = useSelector(state => state.auth);
    const {
        photos,
        loading: photoLoading,
        error: photoError,
        message: photoMessage
    } = useSelector(state => state.photo);
    const dispatch = useDispatch();
    const newPhotoForm = useRef(null);
    const editPhotoForm = useRef(null);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [editId, setEditId] = useState(""); 
    const [editTitle, setEditTitle] = useState(""); 
    const [editImage, setEditImage] = useState(""); 

    const clearMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleFile = (e) => {
        const imageFile = e.target.files[0];
        setImage(imageFile);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const photoObj = {
            title,
            src: image,
        }

        const formData = new FormData();
        const photoFormData = Object.keys(photoObj).forEach(key => formData.append(key, photoObj[key]));
        formData.append("photo", photoFormData);

        dispatch(createUserPhoto(formData));
        setTitle("");
        setImage("");

        clearMessage(); 
    }

    const toggleForms = () => {
        newPhotoForm.current.classList.toggle("hide");
        editPhotoForm.current.classList.toggle("hide");  
    }

    const handleEditForm = (photo) => {
        if(editPhotoForm.current.classList.contains("hide")) {
            toggleForms();  
        }
        setEditId(photo._id); 
        setEditTitle(photo.title); 
        setEditImage(photo.src); 
    }

    const handleEditPhoto = (e) => {
        e.preventDefault(); 

        const photoObj = {
            _id: editId,
            title: editTitle,
        }; 
        dispatch(updateUserPhoto(photoObj)); 
        clearMessage(); 
    }

    const handleCancelEdit = () => {
        if(newPhotoForm.current.classList.contains("hide")) {
            toggleForms();  
        }
        setEditTitle("");
        setEditImage(""); 
    }

    const handleDeletePhoto = (id) => {
        dispatch(deleteUserPhoto(id)); 
        clearMessage(); 
    }

    useEffect(() => {
        dispatch(readUserDetails(id));
        dispatch(readUserPhotos(id));
    }, [dispatch, id]);

    if (loading) {
        <p>Loading...</p>
    }

    return (
        <div id="profile">
            <div className="profile-info">
                <div className="profile-header">
                    {user.profileImage && (
                        <img
                            width={100}
                            alt={user.name}
                            title={user.name}
                            src={`${uploads}/users/${user.profileImage}`} />
                    )}
                    <div className="profile-description">
                        <h2>{user.name}</h2>
                        <p>{user.bio}</p>
                    </div>

                </div>
                {id === currentUser._id && (
                    <>
                        <div className="new-photo" ref={newPhotoForm}>
                            <h3>Share some moment of yours</h3>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <span>Title: </span>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={title || ""}
                                        onChange={handleTitle}
                                        placeholder="Title" />
                                </label>
                                <label>
                                    <span>Image: </span>
                                    <input
                                        type="file"
                                        name="src"
                                        id="src"
                                        onChange={handleFile} />
                                </label>
                                <button
                                    className="custom-form-btn"
                                    type="submit"
                                    id="create-photo-btn"
                                    disabled={photoLoading}
                                >{photoLoading ? "Loading..." : "Post"}
                                </button>
                            </form>
                        </div>
                        <div className="edit-photo hide" ref={editPhotoForm}>
                            <p>Editing: </p>
                            {editImage && (
                                <img 
                                    alt={editTitle}
                                    src={`${uploads}/photos/${editImage}`}
                                    />
                            )}
                            <form onSubmit={handleEditPhoto}>
                                <input 
                                    type="text"
                                    placeholder="Enter a title"
                                    value={editTitle || ""}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                <button 
                                    type="submit" 
                                    disabled={photoLoading}
                                    >{photoLoading ? "Loading..." : "Edit"}
                                </button>
                                <button 
                                    type="reset"
                                    onClick={handleCancelEdit} 
                                    className="cancel-btn">
                                        Cancel
                                </button>
                            </form>
                        </div>
                        {photoError && <Message type="error" text={photoError} />}
                        {photoMessage && <Message type="success" text={photoMessage} />}
                    </>
                )}
            </div>
            <div className="user-photos">
                <h2>Photos published</h2>
                <div className="photos-container">
                    {photos && photos.map(photo => (
                        <div key={photo._id} className="photo">
                            {photo.src && (
                                <img
                                    src={`${uploads}/photos/${photo.src}`}
                                    alt={photo.title}
                                    title={photo.title} />
                            )}
                            {id === currentUser._id ? (
                                <div className="actions">
                                    <Link to={`/photos/${photo._id}`}><BsFillEyeFill /></Link>
                                    <BsPencilFill onClick={() => handleEditForm(photo)} />
                                    <BsXLg onClick={() => handleDeletePhoto(photo._id)} />
                                </div>
                            ) : (
                                <Link className="btn" to={`/photos/${photo._id}`}>See</Link>
                            )}
                        </div>
                    ))}
                    {!photoLoading && photos && photos.length == 0 && <p>There are no photos published</p>}
                </div>
            </div>
        </div>
    )
}