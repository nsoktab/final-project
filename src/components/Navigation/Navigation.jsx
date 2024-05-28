import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import logo from "../../assets/logo.svg";
import "./Navigation.css";

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    navigate("/404");
  };

  return (
    <div className="navbar">
      <div className="left">
        <img
          src={logo}
          alt="Platform logo - triangle with letter ax inside"
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />
        <span className="body_text">Welcome back, Natalia</span>
      </div>
      <div className="right">
        <ul className="nav-links">
          <li>
            <a href="/404" onClick={handleLinkClick}>
              About
            </a>
          </li>
          <li>
            <a href="/404" onClick={handleLinkClick}>
              Documentation
            </a>
          </li>
          <li>
            <a href="/404" onClick={handleLinkClick}>
              Settings
            </a>
          </li>
        </ul>
        <Button text="Log out" />
      </div>
    </div>
  );
}
