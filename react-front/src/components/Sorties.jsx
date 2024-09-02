import logo from "../assets/photo-1611345405264-d9f9629c2f3c.webp"

export default function Sorties(){
    return (
        <>
            <h1>Liste des sorties</ h1>
            <div className="sorties-container">
                <div className="sorties-options-container">
                    
                    <img src={logo} className="smallImg"/>
                    
                    <div className="contenu-options">
                        <h2>Nom de l'event</h2>
                        <h3>Nombre de participants: X</ h3>
                    </div>

                </div>
                
                <div className="savoirplusSmallButton">
                        <button type="submit">En savoir +</button>
                </div>
            </div>
        </>
    )
}