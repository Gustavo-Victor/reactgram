/* eslint-disable react/prop-types */
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "./style.css";


export default function LikeContainer({photo, user, handleLike}) {
    return (
        <div className="like">
            {photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <BsHeartFill onClick={() => handleLike(photo)} />
                        ) : (
                        <BsHeart onClick={() => handleLike(photo)} />
                    )}
                    <p>{photo.likes.length} like(s)</p>
                </>
            )}
        </div>
    )
}