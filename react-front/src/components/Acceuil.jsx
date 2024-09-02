import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Acceuil() {
  let iconesSocial = [faGithub, faTwitter, faGoogle];
  const [icones, setIcone] = useState([]);

  const getIcones = () => {
    axios
      .get("http://localhost:8000/api/providerController")
      .then((reponse) => {
        return reponse.data;
      })
      .then((data) => {
        setIcone(data);
      });
  };

  useEffect(() => {
    getIcones();
  }, []);
  return (
    <>
      <div className="container-icons">
        <h1 style={{ textAlign: 'center' }}>Connecte toi avec</h1>

        <div className="container_icon">
          {icones.map((icone, index) => {
            return (
                <div className="icons_social" key={index}>
                <Link to={`http://localhost:8000/auth/redirect/${icone}`} className="icons_s">
                    <FontAwesomeIcon icon={iconesSocial[index]} fontSize={50} />
                </Link>
                <h2>{icone}</h2>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}
