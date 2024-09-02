import logo from "../assets/photo-1611345405264-d9f9629c2f3c.webp";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from "react";

export default function ProfileContainer(){

    const [userDonnée, setUserDonnée] = useState([]);
    const [getDonnée, setGetDonnée] = useState(false);

    const location = useLocation();
    let uuidOfUser = location.pathname.split('/')[2];
  
    const getInformationOfUserByUuuid = () => {
      axios.get(`http://localhost:8000/api/users/${uuidOfUser}`).then(axiosReponse => {
        return axiosReponse.data
      })
      .then(value => {
        if(value.length > 0 && value !== undefined) {
            setGetDonnée(true)
            setUserDonnée(value[0])
        } else {
            setGetDonnée(false);
            setUserDonnée(value[0])
        }
      })
    }
  

    useEffect(() => {
      getInformationOfUserByUuuid();
    }, []);

    return (
    <>
        <div className="body-events">
            <div>
                <h1>Titre event</h1>
            </div>

            <div className="body-options">
                <div className="body-options-container">
                    <img src={getDonnée ? userDonnée.avatar : 'http//google.images.net'} width="32px" className="mediumImg"/>
                    <div className="contenu-options">
                        <h2>{userDonnée.name}</h2>
                        <h3>{userDonnée.description}</h3>
                    </div>
                </div>
            </div>

        </div> 
    </>
    )
}