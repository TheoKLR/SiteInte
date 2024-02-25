
import './LoginFormStyle.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useRef, useState, useEffect, useContext } from "react";
import { api } from '../api/axiosAPI';
import axios from 'axios';
const LOGIN_URL = '/auth/login';

export const LoginForm = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    const client_id = '50505771275';
    const client_secret = '3631ddfe9365f640041167a3ffd34193';
    const authorization_code = '<authorization_code>'; // You may get this from $_GET['code']
    const baseURL = 'https://etu.utt.fr/';
    const tokenEndpoint = '/api/oauth/token';


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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        api.post('/auth/register', {
            first_name: "student",
            last_name: "student",
            email: "student@utt.fr",
            password: "12345678"
        })
            .then(function (response) {
                console.log('Utilisateur enregistré avec succès');
            })
            .catch(function (error) {
                console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
            });


        try {
            const response = await api.post(LOGIN_URL,
                { email: user, password: pwd }
            );
            const accessToken = response?.data?.data;
            localStorage.setItem("authToken", accessToken);
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No server response')
            } else if (err.response?.status === 400) {
                setErrMsg('E-mail ou Mot de passe erroné(s)');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }

    }

    const handleClick = () => {
        setState(!state);
    }

    const handleClick2 = () => {
        const client = axios.create({
            baseURL: baseURL,
            auth: {
                username: client_id,
                password: client_secret
            }
        });

        client.post(tokenEndpoint, {
            grant_type: 'authorization_code',
            authorization_code: authorization_code
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error.response.data);
            });
    }

    return (
        <>
            {success ? (
                window.location.href = "/Home"
            ) : (
                <div id="container" className={state ? "#container active" : "#container"}>
                    <h1>Bienvenue!</h1>
                    <button onClick={handleClick}>Je suis nouveau</button>
                    <button onClick={handleClick2}>Je suis étudiant à l'UTT</button>

                    <div id="formNouveau" className={state ? "#formNouveau active" : "#formNouveau"}>
                        <form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <h4>Tu as normalement reçu ton mot de passe par e-mail sur l'adresse que tu as fournie à l'UTT.</h4>
                            <p>Pas de mail ? Contacte-nous à l'adresse mail inte@utt.fr</p>
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
