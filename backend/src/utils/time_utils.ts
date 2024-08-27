export const toUTCPlus2 = (date: Date): Date => {
    // Create a Date object in local time with offset UTC+2
    const localTime = new Date(date.getTime() - (2 * 60 * 60 * 1000)); // Subtract 2 hours for UTC+2
    return localTime;
}

export const formatToISO = (date: Date): string => {
    // Format the date to ISO string without modifying the time
    return date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }); // Keep the date and time portion only
};

export const timeToStr = async (startTime: any, endTime: any) => {
    // Convert input to Date objects if they are not already
    const start = (startTime instanceof Date) ? startTime : new Date(startTime);
    const end = (endTime instanceof Date) ? endTime : new Date(endTime);


    // Check if start and end are valid Date objects
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid startTime or endTime provided.");
    }

    const utc2Start = toUTCPlus2(start);
    const utc2End = toUTCPlus2(end);


    // Do not adjust the time manually, just format it
    const start_time_str = formatToISO(utc2Start);
    const end_time_str = formatToISO(utc2End);

    return { start_time_str, end_time_str };
};

  // Fonction pour parser une date au format "dd/MM/yyyy HH:mm:ss"
export const parseDateString = (dateString: string): Date => {
    const [day, month, year, hour, minute, second] = dateString.split(/[\s/:]+/).map(Number);
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  };

  // Fonction pour réinitialiser l'heure d'une date à minuit (00:00:00
export  const resetTimeToMidnight = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  };
