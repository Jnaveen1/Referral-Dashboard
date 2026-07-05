import {Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login", {replace: true});
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo-link">
        <h1 className="logo">Go Business</h1>
      </Link>

      <div className="nav-buttons">

        <button
          type="button"
          className="try-btn"
        >
          Try for free
        </button>

        <button
          type="button"
          className="logout-btn"
          onClick={onClickLogout}
        >
          Log out
        </button>

      </div>

    </nav>
  );
};

export default Navbar;