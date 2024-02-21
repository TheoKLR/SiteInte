import { Component } from "react";
import './LoginFormStyle.css';
import { FaUser, FaLock } from "react-icons/fa";

class LoginForm extends Component{

    state={clicked: false}
    

    handleClick = () => {
        this.setState({clicked:!this.state.clicked})
    }

    render(){
        return(
            <>
                <div id="container" className={this.state.clicked ? "#container active" : "#container"}>
                    <h1>Bienvenue!</h1>
                    <button onClick={this.handleClick}>Je suis nouveau</button>
                    <a href="https://integration.utt.fr/dashboard" target="_blank" rel="noopener noreferrer"><button>Je suis ancien</button></a>
    
                    <div id="formNouveau" className={this.state.clicked ? "#formNouveau active" : "#formNouveau"}>
                        <form>
                            <h1>Login</h1>
                            <h4>Tu as normalement reçu ton Username et ton mot de passe par mail sur l'adresse que tu as fournie à l'UTT.</h4>
                            <p>Pas de mail? Contacte-nous à l'adresse mail inte@utt.fr</p>
                            <div className="input-box">
                                <input type="text" placeholder="Username" required />
                                <FaUser className="icon"/>
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" required />
                                <FaLock className="icon"/>
                            </div>
                            <button type="submit">Login</button>
                 
                        </form>


                        <button onClick={this.handleClick}>Back</button>
                    </div>
                </div>
  
            </>
        )    
    }
    
}

export default LoginForm;