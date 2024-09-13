class PicoPlacaService {
    static verify(plate, date, time) {
        const lastDigit = parseInt(plate.slice(-1));  // Extract the last digit of the plate
        const [year, month, day] = date.split('-').map(Number);
        const inputDate = new Date(Date.UTC(year, month - 1, day));  // Create the date in UTC
        const dayOfWeek = inputDate.getUTCDay();  // Get the day of the week in UTC (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

        const currentTime = parseInt(time.replace(':', ''));

        // console.log('Last digit of the plate:', lastDigit);
        // console.log('Input date:', date);
        // console.log('Day of the week (0=Sunday, 6=Saturday):', dayOfWeek);
        // console.log('Current time:', currentTime);

        // Restricted hours in HHMM format (24-hour format)
        const restrictedHours = [
            { start: 700, end: 930 },   // 07:00 - 09:30
            { start: 1600, end: 1930 }, // 16:00 - 19:30
        ];

        // Pico y Placa rules based on the day of the week and the last digit of the plate
        const restrictions = {
            1: [1, 2],  // Monday: plates ending in 1 and 2
            2: [3, 4],  // Tuesday: plates ending in 3 and 4
            3: [5, 6],  // Wednesday: plates ending in 5 and 6
            4: [7, 8],  // Thursday: plates ending in 7 and 8
            5: [9, 0],  // Friday: plates ending in 9 and 0
        };

        const restrictedPlates = restrictions[dayOfWeek] || [];
        const isPlateRestricted = restrictedPlates.includes(lastDigit);

        const isWithinRestrictedHours = restrictedHours.some(hour =>
            currentTime >= hour.start && currentTime <= hour.end
        );

        // console.log('Is plate restricted?:', isPlateRestricted);
        // console.log('Is within restricted hours?:', isWithinRestrictedHours);

        return !(isPlateRestricted && isWithinRestrictedHours);
    }
}

export default PicoPlacaService;
