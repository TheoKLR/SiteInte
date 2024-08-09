import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { handleError } from '../utils/Submit';
import { resetPasswordUser } from '../../services/requests/auth';
import "./Login.css";

interface ResetPasswordProps {
    token: string;
}

export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");

            const response = await handleError("Password reseted !", "An error occured, please contact an Admin", resetPasswordUser, token, password);
            if(response){
                window.location.href = '/';
            }
        } catch (error) {
            toast.error("Erreur de connexion au serveur");
        }
    };

    return (
        <div className="formNouveau login active">
            <form onSubmit={handleSubmit}>
                <h1>Réinitialiser le mot de passe</h1>
                <div className="input-box">
                    <label>Nouveau mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label>Confirmer le mot de passe :</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div  className="submitButton">
                    <button className="login-button" type="submit">Réinitialiser</button>
                </div>
            </form>
            <ToastContainer position="bottom-right" />
        </div>
        
    );
};
