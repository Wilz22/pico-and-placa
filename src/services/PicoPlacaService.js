class PicoPlacaService {
    static verificar(placa, fecha, hora) {
        const ultimoDigito = parseInt(placa.slice(-1));  // Extrae el último dígito de la placa
        const [year, month, day] = fecha.split('-').map(Number);
        const fechaIngresada = new Date(Date.UTC(year, month - 1, day));  // Crear la fecha en UTC
        const diaSemana = fechaIngresada.getUTCDay();  // Obtener el día de la semana en UTC (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)

        const horaActual = parseInt(hora.replace(':', ''));

        console.log('Último dígito de la placa:', ultimoDigito);
        console.log('Fecha ingresada:', fecha);
        console.log('Día de la semana (0=Domingo, 6=Sábado):', diaSemana);
        console.log('Hora actual:', horaActual);

        // Horarios restringidos en el formato HHMM (24 horas)
        const horariosRestringidos = [
            { inicio: 700, fin: 930 },   // 07:00 - 09:30
            { inicio: 1600, fin: 1930 }, // 16:00 - 19:30
        ];

        // Reglas de Pico y Placa según el día de la semana y el último dígito de la placa
        const restricciones = {
            1: [1, 2],  // Lunes: placas terminadas en 1 y 2
            2: [3, 4],  // Martes: placas terminadas en 3 y 4
            3: [5, 6],  // Miércoles: placas terminadas en 5 y 6
            4: [7, 8],  // Jueves: placas terminadas en 7 y 8
            5: [9, 0],  // Viernes: placas terminadas en 9 y 0
        };

        const diasRestringidos = restricciones[diaSemana] || [];
        const placaRestringida = diasRestringidos.includes(ultimoDigito);

        const dentroHorarioRestringido = horariosRestringidos.some(horario =>
            horaActual >= horario.inicio && horaActual <= horario.fin
        );

        console.log('¿Placa restringida?:', placaRestringida);
        console.log('¿Dentro de horario restringido?:', dentroHorarioRestringido);

        return !(placaRestringida && dentroHorarioRestringido);
    }
}

export default PicoPlacaService;
