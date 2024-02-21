
import "./FooterStyle.css";

function Footer (){

    return(
        <>
            <footer>
                <div className="footer-content">
                    <h3>Intégration UTT</h3>
                    <p>Retrouvez-nous sur les réseaux</p>
                    <ul className="socials">
                        <li><a href="https://www.facebook.com/UTTroyes"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="https://www.instagram.com/uttroyes/"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="https://www.youtube.com/@ChaineUTT"><i className="fa fa-youtube"></i></a></li>
                        <li><a href="https://www.twitter.com/UTTroyes/"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="https://www.linkedin.com/school/universit%C3%A9-de-technologie-de-troyes//"><i className="fa fa-linkedin-square"></i></a></li>
                    </ul>
                    <p>Développé par Théo et Lou</p>
                </div>
            </footer>
        </>
    )

}

export default Footer;

