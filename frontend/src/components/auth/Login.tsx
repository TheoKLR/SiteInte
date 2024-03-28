import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { newStudentLogin, studentLogin } from '../../services/requests';

const LoginForm = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [state, setState] = useState(false);

    useEffect(() => {
        const login = async () => {
            if (localStorage.getItem("tryLogin") === "true") {
                await TryLogin()
            }
        };
        if (userRef.current) userRef.current.focus()
        login();
    }, []);

    const NSLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = await newStudentLogin(user, pwd);
            if (token !== null) {
                localStorage.setItem("authToken", token);
                window.location.href = "/Home"
            }
        } catch (err: any) {
            if (!err?.response) setErrMsg('No server response');
            else if (err.response?.status === 400) setErrMsg('E-mail ou Mot de passe erroné(s)');
            else setErrMsg('Login failed');
            if (errRef.current) errRef.current.focus();
        }
    }

    const getAuthCode = () => {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("authorization_code");
        return code
    }

    const TryLogin = async () => {
        localStorage.setItem("tryLogin", "false");

        try {
            const code = getAuthCode();
            if (code !== null){
                const token = await studentLogin(code);
                localStorage.setItem("authToken", token);
                window.location.href = "/Home"
            }
        } catch (err: any) {
            console.log(err)
        }
    }

    const handleClick = () => {
        setState(!state);
    }

    const ETUconnection = () => {
        localStorage.setItem("tryLogin", "true");
        window.location.href = "https://etu.utt.fr/api/oauth/authorize?client_id=15906313225&scope=public&response_type=code&state=xyz";
    }

    // Frontend
    return (
        <div id="container" className={state ? "#container active" : "#container"}>
            <h1>Bienvenue!</h1>
            <button className="login-button" onClick={handleClick}>Je suis nouveau</button>
            <button className="login-button" onClick={ETUconnection}>Je suis étudiant à l'UTT</button>
            <div id="formNouveau" className={state ? "#formNouveau active" : "#formNouveau"}>
                <form onSubmit={NSLogin}>
                    <h1>Connection</h1>
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
                    <button className="login-button" type="submit">Connection</button>
                </form>
                <button className="login-button" onClick={handleClick}>Retour</button>
            </div>
        </div>
    )
}

export default LoginForm