import { Link } from "react-router-dom";
import "./style.css"; 


export default function NotFound() {
    return (
        <div id="not-found">
            <h2>Page not found 😟</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="btn">Go Back</Link>
        </div>
    )
}