/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { uploads } from "../../../utils/config";
import "./style.css"; 


export default function PhotoItem({photo}) {
    return (
        <div className="photo-item">
            {photo.src && 
                <img
                    width={100}
                    alt={photo.title}
                    title={photo.title} 
                    src={`${uploads}/photos/${photo.src}`} />
            }
            <h2>{photo.title}</h2>
            <p className="photo-autho">
                Posted by: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
            </p>
        </div>
    )
}