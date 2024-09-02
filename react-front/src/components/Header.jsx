import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import "@fontsource/roboto";
import Typography from "@mui/material/Typography";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/style.css";
import { Link } from "react-router-dom";
import logo from "../assets/artisan.png";

export default function Header() {

  return (
    <>
      <div className="header">
        
        <div>
          <img src={logo} alt="logo du site" />
        </div>
        
        <div className="grpIcon_connection">
          <FontAwesomeIcon icon={faUser} className="icon_user" />
          <Link to={"http://localhost:3000/"} className="icons_s">
            <FontAwesomeIcon icon={faRightFromBracket} className="icon_user" />
          </Link>
        </div>

      </div>
    </>
  );
}
