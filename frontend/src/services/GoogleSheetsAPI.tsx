import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY ;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const REDIRECT_URI = 'https://integration.utt.fr/';

export const useGoogleSheetsAPI = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPE,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        redirect_uri: REDIRECT_URI,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
      }).catch((error: any) => {
        console.error('Error initializing Google API client:', error);
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const appendDataToSheet = (data: any[], sheetname: string) => {
    const params = {
      spreadsheetId: SPREADSHEET_ID,
      range: sheetname+'!A1',
      valueInputOption: 'RAW',
    };
    if(sheetname ==='DB_USER'){
      const valueRangeBody = {
        majorDimension: 'ROWS',
        values: data.map((item: { id: any; first_name: any; last_name: any; email: any; permission: any; team_id: any; userWishes: any; teamName:any; }) => [
          item.id, 
          item.first_name, 
          item.last_name, 
          item.email, 
          item.permission, 
          item.team_id,
          item.teamName,
            item.userWishes
        ]),
      };
      return gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);  
    }
    else if (sheetname === 'DB_TEAM'){
      const valueRangeBody = {
        majorDimension: 'ROWS',
        values: data.map((item: { id: any; isOfficial: any; timeCode: any; name: any; faction: any; }) => [
          item.id, 
          item.isOfficial, 
          item.timeCode, 
          item.name, 
          item.faction
        ]),
      };
      return gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    }

    
  };

  return { appendDataToSheet };
};