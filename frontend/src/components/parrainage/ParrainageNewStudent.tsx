import React from "react";
import "./Parrainage.css";

export const ParrainageStudent = () => {
    return (
        <div className="container-parrainage">
            <div className="header-parrainage">
                <h3>Tu vas intégrer l'UTT et tu souhaites être accompagner par un étudiant pour connaître encore mieux ta nouvelle école ?</h3>
                <h3>Alors remplis ce formulaire sans plus attendre !</h3>
            </div>
            <div className="iframe-container-parrainage">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScRSe2IMVGRA9jMhifQTJiGWbyPJIh6f5g-Spzel9dwhGmMFA/viewform?embedded=true"
                    className="iframe"
                    title="Parrainage Form"
                >
                    Chargement…
                </iframe>
            </div>
        </div>
    );
};
