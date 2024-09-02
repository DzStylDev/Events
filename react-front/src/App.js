import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import DetailsEvenements from './components/Fiche-evenements'; 
import Acceuil from './components/Acceuil';  
import Sortie from './components/Sortie.jsx'; 
import Profile from './components/Profile';

function App() {
    return (
        <Routes>  
            <Route path='/' element={<Acceuil />} />
            <Route path="/home" element={<HomePage evenements={[]} />} />
            <Route path="/home/Fiche-evenements/:uid" element={<DetailsEvenements />} /> 
            <Route path="/sortie/:uid" element={<Sortie evenement={[]} />} />
            <Route path="/member/:uuid" element={ < Profile /> } />
        </Routes>
    );
}

export default App;
