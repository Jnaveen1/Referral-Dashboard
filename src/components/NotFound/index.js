import { Link } from "react-router-dom";
import './index.css'

const NotFound = () =>{
    return(
        <div className="not-found-container">
            <div className="not-found-content">
                <h1>404</h1>
                <p>Page Not Found</p>
                <Link to="/" className="back-link">
                    ← Back to dashboard
                </Link>
            </div>
        </div>  
    )
}

export default NotFound
