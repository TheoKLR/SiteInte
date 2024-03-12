import './LoginFormStyle.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { loginUser } from '../services/requests';

// Formulaire de Login présent sur la page d'acceuil du site
export const LoginForm = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [state, setState] = useState(false);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    // Gestion de la connexion en appuyant sur le bouton Login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Requête axios pour la connexion + gestion erreurs possibles
        try {
            const token = await loginUser(user, pwd);
            if (token !== null) {
                localStorage.setItem("authToken", token);
                setSuccess(true);
            }
        } catch (err: any) {
            if (!err?.response) setErrMsg('No server response')
            else if (err.response?.status === 400) setErrMsg('E-mail ou Mot de passe erroné(s)')
            else if (err.response?.status === 401) setErrMsg('Unauthorized');
            else setErrMsg('Login failed');

            if (errRef.current) errRef.current.focus();
        }

    }

    const handleClick = () => {
        setState(!state);
    }

    const handleClickEtudiant = () => {

    }

    // Frontend
    return (
        <>
            {success ? (
                window.location.href = "/Home"
            ) : (
                <div id="container" className={state ? "#container active" : "#container"}>

                    <h1>Bienvenue!</h1>
                    <button onClick={handleClick}>Je suis nouveau</button>
                    <button onClick={handleClickEtudiant}>Je suis étudiant à l'UTT</button>

                    <div id="formNouveau" className={state ? "#formNouveau active" : "#formNouveau"}>
                        <form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <h4>Tu as normalement reçu ton mot de passe par e-mail sur l'adresse que tu as fournie à l'UTT.</h4>
                            <p>Pas de mail ? Contacte-nous à l'adresse mail integration@utt.fr</p>
                            <div className="input-box">
                                <input type="text" placeholder="E-mail" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
                                <FaUser className="icon" />
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                                <FaLock className="icon" />
                            </div>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <button type="submit">Login</button>
                        </form>
                        <button onClick={handleClick}>Back</button>
                    </div>

                </div>
            )}
        </>
    )
}
