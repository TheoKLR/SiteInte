import "./Login.css";
import { useRef, useState, useEffect } from "react";
import { newStudentLogin, studentLogin, registerStudent } from "../../services/requests";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils/Submit";
import { colors } from "react-select/dist/declarations/src/theme";

const LoginForm = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [first_name, setFirstName]= useState("");
  const [last_name, setLastName]= useState("");
  const [email, setEmail]= useState("");
  const [pwd, setPwd] = useState("");
  const [birthday, setBirthday]= useState("");
  const [discord_id, setDiscordId]= useState("");
  const [contact, setContact]= useState("");
  //const [uuid, setUUID]= useState("");

  const [errMsg, setErrMsg] = useState("");
  const [stateNewLogin, setStateNewLogin] = useState(false);
  const [stateNewRegister, setStateNewRegister] = useState(false);

  useEffect(() => {
    const login = async () => {
      if (localStorage.getItem("tryLogin") === "true") {
        await TryLogin();
      }
    };
    if (userRef.current) userRef.current.focus();
    login();
  }, []);

  const NSLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await newStudentLogin(email, pwd);
      if (token !== null) {
        localStorage.setItem("authToken", token);
        window.location.href = "/Home";
      }
    } catch (err: any) {
      if (!err?.response) setErrMsg("No server response");
      else if (err.response?.status === 400)
        setErrMsg("E-mail ou Mot de passe erroné(s)");
      else setErrMsg("Login failed");
      if (errRef.current) errRef.current.focus();
    }
  };

  const NSRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleError("Utilisateur ajouté !", "Une erreur est survenue", registerStudent, first_name, last_name, email, pwd, birthday, contact, discord_id)
    setFirstName("");
    setLastName("");
    setEmail("");
    setBirthday("");
    setPwd("");
    setDiscordId("");
    setContact("");
  };

  const getAuthCode = () => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("authorization_code");
    return code;
  };

  const TryLogin = async () => {
    localStorage.setItem("tryLogin", "false");
    try {
      const code = getAuthCode();
      if (code !== null) {
        const token = await studentLogin(code);
        localStorage.setItem("authToken", token);
        window.location.href = "/Home";
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleClick_NouveauLogin = () => {
    setStateNewLogin(!stateNewLogin);
  };

  const handleClick_NouveauRegister = () => {
    setStateNewRegister(!stateNewRegister);
  };

  const ETUconnection = () => {
    localStorage.setItem("tryLogin", "true");
    window.location.href = `https://etu.utt.fr/api/oauth/authorize?client_id=${process.env.REACT_APP_ETUUTT_CLIENT_ID}&scope=public&response_type=code&state=xyz`;
  };


  const getContainerClass = () => {
    if (stateNewLogin) return "active login";
    if (stateNewRegister) return "active register";
    return "container-login";
  };
  

  // Frontend
  return (
    <div className="Login">
    <div id="container-login" className={getContainerClass()}>
      
      <h1>Bienvenue!</h1>
        <button className="login-button" onClick={handleClick_NouveauLogin}>
          Je suis nouveau et je me connecte
        </button>
        <button className="login-button" onClick={handleClick_NouveauRegister}>
          Je suis nouveau et je m'inscris
        </button>
        <button className="login-button" onClick={ETUconnection}>
          Je suis étudiant à l'UTT
        </button>

    </div>  
    <div className={stateNewLogin ? "formNouveau login active" : "formNouveau"}>
        <form onSubmit={NSLogin}>
          <h1>Connexion</h1>
          <h4>
            Connecte toi avec les identifiants que tu as renseigné !
          </h4>
          <p>Un problème ? Contacte-nous à l'adresse mail integration@utt.fr</p>
          <div className="input-box">
            <input
              type="text"
              placeholder="E-mail"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <button className="login-button" type="submit">
            Connexion
          </button>
          <button className="login-button" onClick={handleClick_NouveauLogin}>
          Retour
        </button>
        </form>
      </div>


    <div className={stateNewRegister ? "formNouveau register active" : "formNouveau"}>
          <h1>Inscription</h1>
          <p>Pas de mail ? Contacte-nous à l'adresse mail integration@utt.fr</p>
          <form onSubmit={NSRegister}>
            <div className="input-box">
              <label>
                  Prénom:
                  <input
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                  />
                </label>
            </div>
            <div className="input-box">
              <label>
                  Nom:
                  <input
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                  />
              </label>
            </div>
            <div className="input-box">
              <label>Email:
                  <input
                      type="text"
                      value={email}
                      required
                      onChange={(e)=> setEmail(e.target.value)}
                  />
              </label>
            </div>
            <div className="input-box">
              <label>
                Date de naissance:
                  <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                  />
              </label>
            </div>
            <div className="input-box">
              <label>
                  Mot de passe:
                  <input
                      type="password"
                      placeholder="Password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      required
                  />
              </label>
            </div>
            <div className="input-box">
              <label>
                  Tag Discord (Utile pour pouvoir rejoindre le discord de l'intégration et prendre contact avec ton équipe):
                  <input
                      type="text"
                      placeholder="Discord Tag"
                      value={discord_id}
                      onChange={(e) => setDiscordId(e.target.value)}
                  />
              </label>
            </div>
            <div className="input-box">
              <label>
              Tes moyens de contact (tu peux en mettre plusieurs si tu le souhaites😊):
                    <textarea
                        value={contact}
                        placeholder="Entre tes moyens de contact ici..."
                        onChange={(e) => setContact(e.target.value)}
                    />
              </label>
            </div>
            {/*<div className="input-box">
              <label>
                  Clef unique fournis par l'UTT:
                  <input
                      type="text"
                      value={uuid}
                      onChange={(e) => setUUID(e.target.value)}
                      required
                  />
              </label>
            </div>*/}
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive">
              {errMsg}
            </p>
            <div>
              <p style={{ fontSize: '10px', color:"black"}}>En m'inscrivant j'accepte que les données renseignées ci-dessus soient stockées et traitées par le BDE UTT dans le cadre de l'intégration UTT</p>
              <button className="login-button" type="submit">Valider</button>
              <button className="login-button" onClick={handleClick_NouveauRegister}>Retour</button>
            </div>
          </form>
    </div>
    <ToastContainer position="bottom-right" />
    </div>
  );
};

export default LoginForm;
