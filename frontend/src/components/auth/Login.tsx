import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { newStudentLogin, studentLogin } from '../../services/requests';

const TryLogin = () => {
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await studentLogin();
                console.log(token)
                localStorage.setItem("authToken", token);                
                setSuccess(true);
            } catch (error) {
                console.log('Student not connected');
            }
        };

        fetchToken();
    }, []);

    if (success) {
        window.location.href = "/Home";
    }

    return <LoginForm />;
};

export default TryLogin;

const LoginForm = () => {
    const userRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLInputElement>(null)

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [state, setState] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    // Gestion de la connexion en appuyant sur le bouton Login
    const NSLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        // Requête axios pour la connexion + gestion erreurs possibles
        try {
            const token = await newStudentLogin(user, pwd)
            if (token !== null) {
                setSuccess(true)
            }

        } catch (err: any) {
            if (!err?.response) setErrMsg('No server response')
            else if (err.response?.status === 400) setErrMsg('E-mail ou Mot de passe erroné(s)')
            else if (err.response?.status === 401) setErrMsg('Unauthorized')
            else setErrMsg('Login failed')

            if (errRef.current) errRef.current.focus()
        }

    }

    const SLogin = async () => {
        try {
            ETUconnection()
        } catch (err: any) {
            setErrMsg('Login failed')
            if (errRef.current) errRef.current.focus()
        }

    }

    const handleClick = () => {
        setState(!state)
    }

    const ETUconnection = () => {
        window.location.href = "https://etu.utt.fr/api/oauth/authorize?client_id=50505771275&scope=public&response_type=code&state=xyz"
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
                    <button onClick={SLogin}>Je suis étudiant à l'UTT</button>

                    <div id="formNouveau" className={state ? "#formNouveau active" : "#formNouveau"}>
                        <form onSubmit={NSLogin}>
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