import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleSheetsAPI } from '../../../services/GoogleSheetsAPI';
import { getAllUsers, getUserWishes } from '../../../services/requests'
import { getAllTeams, getTeam } from '../../../services/requests/teams';
import { getAllUUID } from '../../../services/requests/newstudent';

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

export const SyncDb = () => {

    
    const { appendDataToSheet } = useGoogleSheetsAPI();
    
    const Sync = async () => {

        
      try {

        const response = await getAllUsers();

        const usersWithWishes = await Promise.all(
            response.map(async (user: any) => {
                let userWishes = await getUserWishes(user.id);
                userWishes = userWishes.map((role: any) => ({
                ID: role.desires.id,
                name: role.desires.name,
                }))

                let teamName;
                if(user.team_id){
                  teamName = await getTeam(user.team_id);
                }
                
                if(!teamName){
                  teamName = 'No Team';
                }
                else{
                  teamName=teamName.name;
                }


            return {
                ...user,
                userWishes: userWishes.map((wish: { ID: any; name: any; }) => `${wish.ID}: ${wish.name}`).join(', '),
                teamName
              };
            })
          );

        const AllTeam = await getAllTeams();
        const AllNewStudent = await getAllUUID();

        const resultUSER = await appendDataToSheet(usersWithWishes, 'DB_USER');
        const resultTEAM = await appendDataToSheet(AllTeam, 'DB_TEAM');
        const resultNEWSTUDENT = await appendDataToSheet(AllNewStudent, 'DB_NEWSTUDENT');

        toast.success('Data synchronized successfully!');
      } catch (error) {
        console.error('Error syncing data:', error);
        toast.error('Error syncing data. Please try again.');
      }
    };
  
    return (
      <div>
        <div><p color='red'>Soyez sûr de vous connecter avec le compte 'integrationbureau@bdeassosutt.fr'</p></div>
        <button className="button-36" onClick={Sync}>Sync</button>
        <ToastContainer position="bottom-right"/>
      </div>
    );
  };