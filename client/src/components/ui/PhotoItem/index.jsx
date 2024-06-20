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
            <h3 className="photo-title">{photo.title}</h3>
            <p className="photo-author">
                Posted by: <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
            </p>
        </div>
    )
}