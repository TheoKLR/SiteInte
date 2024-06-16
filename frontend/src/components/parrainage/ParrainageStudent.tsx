import React from "react";
import "./Parrainage.css";

export const ParrainageStudent = () => {
    return (
        <div className="container-parrainage">
            <div className="header-parrainage">
                <h3>Tu es actuellement à l'UTT et tu souhaites accompagner un nouvel étudiant ?</h3>
                <h3>Alors remplis ce formulaire sans plus attendre !</h3>
            </div>
            <div className="iframe-container-parrainage">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLScNenNR2mnFXLj9SHkZSGvPlC7u0eH6o9i97Vv30M_BqXGhiQ/viewform?embedded=true"
                    className="iframe"
                    title="Parrainage Form"
                >
                    Chargement…
                </iframe>
            </div>
        </div>
    );
};
