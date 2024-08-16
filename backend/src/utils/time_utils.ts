export const toUTCPlus2 = (date: Date): Date => {
    // Create a Date object in local time with offset UTC+2
    const localTime = new Date(date.getTime() + (2 * 60 * 60 * 1000)); // Subtract 2 hours for UTC+2
    return localTime;
};

export  const formatToISO = (date: Date): string => {
    return date.toISOString();
};

export const timeToStr = async(startTime : any, endTime: any ) => {
// Convert input to Date objects if they are not already
    const start = (startTime instanceof Date) ? startTime : new Date(startTime);
    const end = (endTime instanceof Date) ? endTime : new Date(endTime);

    // Check if start and end are valid Date objects
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid startTime or endTime provided.");
    }

    const adjustedStart = toUTCPlus2(start);
    const adjustedEnd = toUTCPlus2(end);
    const start_time_str = formatToISO(adjustedStart);
    const end_time_str = formatToISO(adjustedEnd);

    return {start_time_str, end_time_str};

}