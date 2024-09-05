import React, { useEffect } from "react";
import './Wei.css';

export const WeiComponent = () => {

    useEffect(() => {
        // Charge le script de billetweb une fois que le composant est monté
        const script = document.createElement("script");
        script.src = "https://www.billetweb.fr/js/export.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="container-wei">
            <div className="header-wei">
                <h3>Tu es nouveau et tu veux participer à l'événment incroyable qu'est le WEI ?</h3>
                <h3>Alors inscrit toi sans plus attendre !</h3>
            </div>
            <div className="iframe-container-wei">
                <iframe
                    title="Vente de billets en ligne"
                    src="https://www.billetweb.fr/shop.php?event=billetterie-week-end-dintegration-2024"
                    className="shop_frame"
                    style={{width: "100%", height: "600px", border: "none", overflow: "hidden"}}
                />
            </div>
        </div>
    );
};
