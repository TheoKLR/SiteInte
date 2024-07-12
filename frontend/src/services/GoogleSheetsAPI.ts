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

    if(sheetname === 'DB_USER'){
      const headers = ['ID', 'First Name', 'Last Name', 'Email','Branch', 'Permission', 'Birthday', 'Contact', 'Discord Tag','Team ID', 'Team Name', 'User Wishes'];
      const valueRangeBody = {
        majorDimension: 'ROWS',
        values: data.map((item: { id: any; first_name: any; last_name: any; email: any; branch: any; permission: any; birthday :any; contact:any; discord_id: any ;team_id: any; userWishes: any; teamName:any; }) => [
          item.id ?? 0, 
          item.first_name ?? "No first name", 
          item.last_name ?? "No last name", 
          item.email ?? "No email",
          item.branch ?? "No branch", 
          item.permission ?? "No permissions",
          item.birthday ?? "No birthday",
          item.contact ?? "No contact", 
          item.discord_id ?? "No discord_id",
          item.team_id ?? 0,
          item.teamName,
          item.userWishes ?? "No wishes"
        ]),
      };
      valueRangeBody.values.unshift(headers);
      console.log(valueRangeBody);
      return gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);  
    }
    else if (sheetname === 'DB_TEAM'){
      const headers = ['ID', 'Is Official', 'Time Code', 'Name', 'Faction'];
      const valueRangeBody = {
        majorDimension: 'ROWS',
        values: data.map((item: { id: any; isOfficial: any; timeCode: any; name: any; faction: any; }) => [
          item.id ?? 0, 
          item.isOfficial ?? false, 
          item.timeCode ?? 0, 
          item.name ?? "No Name", 
          item.faction ?? 0
        ]),
      };
      valueRangeBody.values.unshift(headers);
      return gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
    }

    else if(sheetname === 'DB_NEWSTUDENT'){
      const headers = ['UUID', 'Is Used', 'User ID'];
      const valueRangeBody = {
        majorDimension: 'ROWS',
        values: data.map((item: { uuid: any; isused: any; userid: any; }) => [
          item.uuid ?? 0, 
          item.isused ?? false, 
          item.userid ?? 0
        ]),
      };
      valueRangeBody.values.unshift(headers);
      return gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);

    }

    
  };

  return { appendDataToSheet };
};