/* eslint-disable react/prop-types */
import "./style.css";


export default function Message({ text, type }) {
    return (
        <div className={`message ${type}`}>
            <p>{text}</p>  
        </div>
    )
}