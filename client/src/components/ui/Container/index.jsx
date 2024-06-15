/* eslint-disable react/prop-types */
import "./style.css"; 


export default function Container({children}) {
    return (
    <div className="container">
        {children}
    </div>)
}