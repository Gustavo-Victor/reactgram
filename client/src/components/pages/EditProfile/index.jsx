import { uploads } from "../../../utils/config";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readUserProfile, resetMessage } from "../../../slices/userSlice";
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

    const handleSubmit = (e) => {
        e.preventDefault(); 
    }

    useEffect(() => {
        dispatch(readUserProfile());         
    }, [dispatch]);

    useEffect(() => {
        if(user) {
            setUserData(user);
        }
    }, [user]); 

    return (
        <div id="edit-profile">
            <h2>Edit your profile</h2>
            <p className="subtitle">Add a profile image and tell more about yourself</p>
            
            {/* preview */}

            <form onSubmit={handleSubmit}>
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
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}