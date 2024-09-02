import { useEffect, useState } from "react";
import imageEleve from "../assets/eleve.png";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Menu() {

  let [getUsers, setUsers] = useState([]);

  let getAllUser = () => {
    axios.get('http://localhost:8000/api/users').then(axiosReponse => {
      return axiosReponse.data
    })
    .then(value => {
      setUsers(value)
    })
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="search-filtre-container">

        <div className="menu">
          <h2>Filtres</h2>
          <select name="" id="">
            <option value="">Concerts</option>
            <option value="">Expositions au musées</option>
            <option value="">Conférences</option>
          </select>
          <input type="text" placeholder="Lieu" />
          <button type="submit">Filter</button>
        </div>

        <div className="users-container">

            { getUsers.map((utilisateur, index) => {
              return (
                <Link to={`/member/${utilisateur.uuid}`}  key={index} className="lien_users">
                <div className="user"> 
             
                <div className="image-container">
                  <img src={utilisateur.avatar} alt=""/>
                </div>
                <div className="info-container">
                  <div className="pseudo" style={{fontFamily: 'monospace', fontSize: '1.2em'}}>{utilisateur.name}</div>
                </div>
  
              </div>
              </Link>
              )
            }) }
            
            {/* <div className="user"> 
             
              <div className="image-container">
                <img src={imageEleve} alt="" srcset="" width={59}/>
              </div>
              <div className="info-container">
                <div className="pseudo" style={{fontFamily: 'monospace', fontSize: '1.2em'}}>John Doe</div>
              </div>

            </div> */}
            

{/* 
            <div className="user"> 
              <img src={imageEleve} alt="" srcset="" width={59}/>
              <div className="pseudo" style={{fontFamily: 'monospace', fontSize: '1.2em'}}>John Doe</div>
            </div> */}

        </div>
      </div>
    </>
  );
}
