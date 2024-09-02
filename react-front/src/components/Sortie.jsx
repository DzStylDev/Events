import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/artisan.png';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from './Header';

function Sortie(props) {
  const { uid } = useParams();
  const [eventDetails, setEventDetails] = useState('');
  const [accessibility, setStatusAccessibility] = useState(false);;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/datasets/${uid}`)
      .then((response) => {
        const eventDetails = response.data.results[0];
        setEventDetails(eventDetails);
      })
      .catch((erreur) => {
        console.error('Erreur lors de la récupération des détails de la sortie', erreur);
      });
  }, [uid]);

  if (!eventDetails) {
    return <div>Chargement en cours...</div>;
  }
  

  const mapContainerStyle = {
    width: '100%',
    height: '200px',
  };

  const center = {
    lat: eventDetails.location_coordinates.lat,
    lng: eventDetails.location_coordinates.lon,

  };
  // console.log(center);

  const inviteFriend = () => {
  }
  const setAccessibilityToPublic = () => {

    axios
      .post(`http://localhost:8000/api/evenements`, {
        uuid: uid,
        status: 0
      }, {
      })
      .then((response) => {
        return response.data
        // const eventDetails = response.data.results[0];
        // setStatusAccessibility(eventDetails.onlineaccesslink);
      })
        document.getElementById('messageSetStatus').style.display = 'block';
  
        document.getElementById('messageSetStatusSpan').style.color = 'green';
        document.getElementById('messageSetStatusSpan').innerHTML = `public`;
        document.getElementById('messageSetStatus').style.fontWeight = '700';
      setTimeout(() => {
        document.getElementById('messageSetStatus').style.display = 'none';
      }, 3000)

  }
  const setAccessibilityToPrivate = () => {

    console.log(`L'évenement ${eventDetails.title_fr} est maintenant privée`)

    axios
      .post(`http://localhost:8000/api/evenements`, {
        uuid: uid,
        status: 1
      }, {
      })
      .then((response) => {
        return response.data
      })
      document.getElementById('messageSetStatus').style.display = 'block';
  
        document.getElementById('messageSetStatusSpan').style.color = 'red';
        document.getElementById('messageSetStatusSpan').innerHTML = `privée`;
        document.getElementById('messageSetStatus').style.fontWeight = '700';

        
      setTimeout(() => {
        document.getElementById('messageSetStatus').style.display = 'none';
      }, 3000)
  }
  


  return (
    <div className='container'>
      < Header />
      <h2>Sortie: {eventDetails.title_fr}</h2>
      <div className="googlemap">
        <LoadScript googleMapsApiKey="AIzaSyBNqzDTIFauS4LbX2BUiLERe2SHbPZ0kQI">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}

            zoom={14}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="body">
        <div className="participants">
          <p>host</p>
          <p>guest1</p>
          <p>guest2</p>
          <p>guest3</p>
          <p>guest4</p>
        </div>
        <div className="chat">

        </div>

      </div>

      <div>
        <input type='text' />
        <button type='submit' onClick={inviteFriend()}>Inviter l'ami à cette évenement</button>
      </div>
      <div>

        Mettre l'évenement en public ou en privé

        <div className='voirdetails'>

          <button style={
            {
              padding: '.7em',
              border: 'none',
              backgroundColor: 'green',
              fontFamily: 'monospace sans-serif',
              fontSize: '.8em',
              color: 'mintcream',
              boxShadow: "1px 3px 5px black",
              textDecoration: 'none',
              width: "20%",
              cursor: 'pointer'
            }
          } onClick={setAccessibilityToPublic}>Public</button>
          <button style={
            {
              padding: '.7em',
              border: 'none',
              backgroundColor: 'red',
              fontFamily: 'monospace sans-serif',
              fontSize: '.8em',
              color: 'mintcream',
              boxShadow: "1px 3px 5px black",
              textDecoration: 'none',
              cursor: 'pointer',
              width: "20%"
            }
          } onClick={setAccessibilityToPrivate}>Privée</button>
        </div>
        <div id='messageSetStatus' style={{ display: 'none', marginTop: '1em'}}>L'évenement {eventDetails.title_fr} est maintenant <span id='messageSetStatusSpan'></span></div>
      </div>

    </div >
  );
}

export default Sortie;
