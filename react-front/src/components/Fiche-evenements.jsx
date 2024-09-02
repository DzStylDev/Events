import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/artisan.png';
import './Fiche-evenements.css';
import { Link } from 'react-router-dom';
import Header from './Header';

function DetailsArticle() {
  const { uid } = useParams();

  console.log(uid);
  const [articleDetails, setArticleDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?where=uid%3D${uid}&limit=20`)
      .then((response) => {
        const eventDetails = response.data.results[0];
        setArticleDetails(eventDetails);
      })
      .catch((erreur) => {
        console.error('Erreur lors de la récupération des détails de l\'article', erreur);
      });
  }, [uid]);
 
  if (!articleDetails) {
    return <div>Erreur lors de la récupération des détails de l'articles</div>;
  }
  return (
    <div className='container'>
     < Header />
      <main>
        <div className="details">
          <h3>{articleDetails.title_fr}</h3>
          <p>{articleDetails.description_fr}</p>
          <img src={articleDetails.image} alt="Image de l'événement" />
        </div>

        <div className="sortie">
          <p>Date: {articleDetails.daterange_fr}</p>
          <p>Lieu: {articleDetails.location_address}</p>
          <Link to={`/sortie/${uid}`}>
            <button>Organiser une sortie</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default DetailsArticle;
