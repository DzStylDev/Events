import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Header from "./Header";

function HomePage(props) {
  const [evenements, setEvenements] = useState([]);
  const [departement, setDepartement] = useState("");
  const [localisationUtilisateur, setLocalisationUtilisateur] = useState(null);
  const [statusEvenement, setStatusEvenement] = useState([]);

  let [getUsers, setUsers] = useState([]);  
  const rayon = 200;

  let getAllUser = () => {
    axios.get('http://localhost:8000/api/users').then(axiosReponse => {
      return axiosReponse.data
    })
    .then(value => {
      setUsers(value)
    })
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const utilisateurPosition = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          console.log(utilisateurPosition);

          setLocalisationUtilisateur(utilisateurPosition);
          obtenirEvenements(utilisateurPosition);
        },
        (erreur) => {
          console.error(
            "Erreur lors de la récupération de la localisation",
            erreur
          );
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
    getAllUser();
  }, []);

  const obtenirEvenements = (position) => {
    axios
      .get(
        "http://localhost:8000/api/evenements"
      )
      .then((response) => {
        const evenementsFiltres = response.data.results.filter((evenement) => {
          return (
            evenement.location_coordinates &&
            estDansRayon(position, evenement.location_coordinates, rayon)
          );  
        });

        // axios.get(`http://localhost:8000/api/evenement_proche/${position.lat}/${position.lon}` , {
        //   }).then(axiosReponse => {
        //   console.log(axiosReponse.data);
        // });
        axios.get('http://localhost:8000/api/evenements_model').then(reponse => {

          setStatusEvenement(reponse.data)
          setEvenements(evenementsFiltres);
        })
      })
      .catch((erreur) => {
        console.error("Erreur lors de la récupération des événements", erreur);
      });
  };

  const estDansRayon = (position1, position2, rayon) => {
    const diffLat = Math.abs(position1.lat - position2.lat);
    const diffLon = Math.abs(position1.lon - position2.lon);
    const maxDiff = Math.max(diffLat, diffLon);

    return maxDiff <= rayon / 111.32;
  };

  const obtenirEvenementsParDepartement = () => {
    axios
      .get(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=location_department%20%3A%22${departement}%22&limit=100`
      )
      .then((response) => {
        const evenementsFiltres = response.data.results.filter((evenement) => {
          return (
            evenement.location_coordinates &&
            estDansRayon(
              localisationUtilisateur,
              evenement.location_coordinates,
              rayon
            )
          );
        });

        axios.get('http://localhost:8000/api/evenements_model').then(reponse => {
          
          setEvenements(evenementsFiltres);
          setStatusEvenement(reponse.data)
        })
      })
      .catch((erreur) => {
        console.error(
          "Erreur lors de la récupération des événements par département",
          erreur
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    obtenirEvenementsParDepartement();
  };

  return (
    <div className="container">
      < Header />
      <main>
        <div className="menu">
          <h1>Menu</h1>
          <h4>Filtre:</h4>
          <select>
            <option value="categories">Catégories</option>
            <option value="Concerts">Concerts</option>
            <option value="Musée">Musée</option>
            <option value="Conférences">Conférences</option>
            <option value="Tourisme">Tourisme</option>
          </select>
          <form onSubmit={handleSubmit}>
            <label>
              <h5>Lieu</h5>
            </label>
            <input
              type="text"
              placeholder="Entrez le département"
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
            />
            <button type="submit">Envoyer</button>
          </form>
          
          <h6>Listes des utilisateurs</h6>

          <div className="users-container">
            {getUsers.map((utilisateur, index) => {
              return (
                <Link
                  to={`/member/${utilisateur.uuid}`}
                  key={index}
                  className="lien_users"
                >
                  <div className="user">
                    <div className="image-container">
                      <img src={utilisateur.avatar} alt="" />
                    </div>
                    <div className="info-container">
                      <div
                        className="pseudo"
                        style={{ fontFamily: "monospace", fontSize: "1.2em" }}
                      >
                        {utilisateur.name}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
        <ul className="evenements">
          <h1 style={{ marginBottom: '.5em'}}>Événements à venir</h1>
          {evenements.map((evenement, index) => (
            <li key={evenement.uid}>
              <h2>{evenement.title_fr}</h2>
              <p>{evenement.daterange_fr}</p>
              <p>{evenement.location_name}</p>
              <p>{evenement.description_fr}</p>
              <img src={evenement.image} alt="Image de l'événement" />
              <div className="voirdetails" style={{
                display: "flex",
                gap: '1em',
              }}>
              <Link to={`/home/Fiche-evenements/${evenement.uid}`} className="evenements-container">
                Voir détails
              </Link>
              <button style={
                { 
                  padding: '.7em', 
                  border: 'none',
                  backgroundColor: statusEvenement[index].status === 0 ? 'green' : 'red',
                  fontFamily: 'monospace, sans-serif',
                  fontSize: '.8em',
                  color: "mintcream",
                  boxShadow: "1px 3px 5px black",
                }}>
                  { statusEvenement[index].status === 0 ? 'public' : 'privée'}
              </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer></footer>
    </div>
  );
}

export default HomePage;
