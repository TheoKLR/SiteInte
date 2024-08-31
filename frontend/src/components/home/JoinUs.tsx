import './JoinUs.css';

// Rubrique contenant les liens vers le serveur discord de l'inté et les différents réseaux de l'utt
export const JoinUs = () => {
    // Frontend
    return (
        <>
            <div className='containerJoinUs'>
                <p>Rejoins le discord de l'Inté</p><br />
                <a href="https://discord.com/channels/690192243113721940"><i className="fa fa-discord"></i></a><br />
                <p>Rejoins l'UTT sur les réseaux</p><br />
                <ul className="socials">
                    <li><a href="https://www.facebook.com/UTTroyes"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com/uttroyes/"><i className="fa fa-instagram"></i></a></li>
                    <li><a href="https://www.youtube.com/@ChaineUTT"><i className="fa fa-youtube"></i></a></li>
                    <li><a href="https://www.twitter.com/UTTroyes/"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/school/universit%C3%A9-de-technologie-de-troyes//"><i className="fa fa-linkedin-square"></i></a></li>
                </ul>   
            </div>

        </>
    )
}