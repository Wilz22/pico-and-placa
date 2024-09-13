import React, { useState, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import PicoPlacaService from '../services/PicoPlacaService';
import { format } from 'date-fns';

const PicoPlacaForm = () => {
    const [placa, setPlaca] = useState('');
    const [fechaHora, setFechaHora] = useState(null);
    const toast = useRef(null);  // Referencia para el componente Toast
    const [mostrarReglas, setMostrarReglas] = useState(false);

    const verificarPicoPlaca = () => {
        if (!placa || !fechaHora) {
            toast.current.show({ severity: 'warn', summary: 'Advertencia', detail: 'Por favor, ingrese todos los datos', life: 3000 });
            return;
        }

        const fechaStr = format(fechaHora, 'yyyy-MM-dd');
        const horaStr = format(fechaHora, 'HH:mm');
        const puedeCircular = PicoPlacaService.verificar(placa, fechaStr, horaStr);

        if (puedeCircular) {
            toast.current.show({ severity: 'success', summary: 'Permitido', detail: 'Puede circular', life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Restringido', detail: 'No puede circular', life: 3000 });
        }
    };

    return (
        <div className="form-container">
            <Toast ref={toast} /> {/* Aquí se coloca el Toast */}

            <Card title="Predictor Pico y Placa" className="p-shadow-6 p-p-4">
                <div className="p-field">
                    <label htmlFor="placa">Número de Placa</label>
                    <InputText id="placa" value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="PBX-1234" />
                </div>
                <div className="p-field">
                    <label htmlFor="fechaHora">Fecha y Hora</label>
                    <Calendar id="fechaHora" value={fechaHora} onChange={(e) => setFechaHora(e.value)} showIcon showTime hourFormat="24" />
                </div>
                <Button label="Verificar Pico y Placa" icon="pi pi-check" className="p-button-success" onClick={verificarPicoPlaca} />
                
                <Button label="Ver Reglas de Pico y Placa" icon="pi pi-info-circle" className="p-button-link p-mt-3" onClick={() => setMostrarReglas(true)} />

                {/* Diálogo para mostrar las reglas */}
                <Dialog header="Reglas del Pico y Placa" visible={mostrarReglas} style={{ width: '50vw' }} onHide={() => setMostrarReglas(false)}>
                    <p>Las restricciones de Pico y Placa están determinadas por el último dígito de la placa:</p>
                    <ul>
                        <li><strong>Lunes:</strong> Placas terminadas en 1 y 2.</li>
                        <li><strong>Martes:</strong> Placas terminadas en 3 y 4.</li>
                        <li><strong>Miércoles:</strong> Placas terminadas en 5 y 6.</li>
                        <li><strong>Jueves:</strong> Placas terminadas en 7 y 8.</li>
                        <li><strong>Viernes:</strong> Placas terminadas en 9 y 0.</li>
                    </ul>
                    <p>Horarios restringidos: de 07:00 a 09:30 y de 16:00 a 19:30.</p>
                </Dialog>
            </Card>
        </div>
    );
};

export default PicoPlacaForm;
