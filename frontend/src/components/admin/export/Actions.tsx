import React from 'react';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ExportDb = () => {

    const Export = async () => {
        try {
            //data à télécharger
            const json_data = [
                {firstname: "James", lastname: "Donnie", email:"jamesdonnie@example.com"},
                {firstname: "Thomas", lastname: "Crown", email:"thomascrown@example.com"},
            ];

            const csv_data = Papa.unparse(json_data);
            // Écriture du fichier CSV
            const blob = new Blob([csv_data], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'export.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erreur lors de l\'exportation:', error);
            toast.error('Erreur lors de l\'exportation. Veuillez réessayer.');
        }
    };

    return (
        <div>
            <button className="button-36" onClick={Export}>Exporter</button>
            <ToastContainer position="bottom-right"/>
        </div>
    );
};
