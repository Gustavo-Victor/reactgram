import { uploads } from "../../../utils/config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readUserProfile, resetMessage, updateUserProfile } from "../../../slices/userSlice";
import Message from "../../ui/Message"; 
import "./style.css"; 


export default function EditProfile() {
    const { error, loading, message, user } = useSelector(state => state.user);
    const initialUserData = {
        name: "",
        email: "", 
        password: "",
        bio: "",
    }
    const [userData, setUserData] = useState(initialUserData || {}); 
    const [previewImage, setPreviewImage] = useState(""); 
    const [profileImage, setProfileImage] = useState(""); 
    const dispatch = useDispatch(); 

    const handleChangeUserData = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        }); 
    }

    const handleFile = (e) => {
        const image = e.target.files[0];
        setPreviewImage(image); 
        setProfileImage(image); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        const data = {}

        if(userData.name) {
            data.name = userData.name; 
        }

        if(userData.bio) {
            data.bio = userData.bio; 
        }

        if(userData.password) {
            data.password = userData.password; 
        }

        if(profileImage && previewImage) {
            data.profileImage = profileImage; 
        }

        const formData = new FormData(); 
        const userFormData = Object.keys(data).forEach(key => formData.append(key, data[key]));
        formData.append("user", userFormData); 
        
        await dispatch(updateUserProfile(formData));    
        dispatch(readUserProfile()); 
        
        setTimeout(() => {
            dispatch(resetMessage()); 
        }, 2000);
    }

    useEffect(() => {
        dispatch(readUserProfile());         
    }, [dispatch]);

    useEffect(() => {
        if(user) {
            setUserData(user);
            setProfileImage(user.profileImage);             
        }
    }, [user]); 

    return (
        <div id="edit-profile">
            <h2>Edit your profile</h2>
            <p className="subtitle">Add a profile image and tell more about yourself</p>
            
            {/* preview */}
            {(user.profileImage || previewImage) && (
                <img 
                    src={
                        previewImage 
                        ? URL.createObjectURL(previewImage)
                        : `${uploads}/users/${user.profileImage}` }
                    alt={user.name}
                    title={user.name}
                    className="profile-image"
                />
            )}

            <form onSubmit={handleSubmit} id="profile-edit-form">
                <input 
                    type="text" 
                    name="name" 
                    id="name"
                    placeholder="Name"
                    value={userData.name || ""}
                    onChange={handleChangeUserData} />
                <input 
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="Email"
                    disabled={true}
                    value={userData.email || ""} />
                <label>
                    <span>Profile Image:</span>
                    <input 
                        type="file" 
                        name="profileImage" 
                        id="profileImage"   
                        onChange={handleFile}                     
                         />
                </label>
                <label>
                    <span>Bio:</span>
                    <textarea 
                        name="bio" 
                        id="bio" 
                        placeholder="Tell a little about you"
                        value={userData.bio || ""}
                        onChange={handleChangeUserData}></textarea>
                </label>
                <label>
                    <span>Want to change your password?</span>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        value={userData.password || ""}
                        onChange={handleChangeUserData} />
                </label>
                <button 
                    disabled={loading}
                    type="submit"
                    id="edit-profile-btn"
                    >{loading ? "Loading..." : "Edit"}
                </button>
                {error && <Message type="error" text={error} />}
                {message && <Message type="success" text={message} />}
            </form>
        </div>
    )
}