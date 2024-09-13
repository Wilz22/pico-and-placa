import React, { useState, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
import PicoPlacaService from '../services/PicoPlacaService';
import { format } from 'date-fns';
import picoPlacaImage from '../assets/images/picoandplaca.jpeg';

const PicoPlacaForm = () => {
    const [plate, setPlate] = useState('');
    const [dateTime, setDateTime] = useState(null);
    const [errors, setErrors] = useState({ plate: false, dateTime: false });
    const toast = useRef(null);
    const [showRules, setShowRules] = useState(false);

    const verifyPicoPlaca = () => {
        // Validate if the plate number and date/time fields are filled
        let validationErrors = { plate: false, dateTime: false };
    
        // Check if the plate field is empty
        if (plate === '') {
            validationErrors.plate = true;
        }
        // Check if the dateTime field is empty
        if (!dateTime) {
            validationErrors.dateTime = true;
        }
    
        // Update the state with the errors found
        setErrors(validationErrors);
    
        // If there are validation errors, show a warning message and stop the process
        if (validationErrors.plate || validationErrors.dateTime) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter all fields', life: 3000 });
            return;
        }
    
        // Format the date and time to the required format
        const dateStr = format(dateTime, 'yyyy-MM-dd');
        const timeStr = format(dateTime, 'HH:mm');
        
        // Call the PicoPlacaService to check if the vehicle can drive
        const canDrive = PicoPlacaService.verify(plate, dateStr, timeStr);
    
        // Show success or error message based on the result from the service
        if (canDrive) {
            toast.current.show({ severity: 'success', summary: 'Allowed', detail: 'You can drive', life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Restricted', detail: 'You cannot drive', life: 3000 });
        }
    };
    
    const handlePlateChange = (e) => {
        // Restrict the license plate input to a maximum of 7 characters
        const value = e.target.value;
        if (value.length <= 7) {
            setPlate(value);
        }
    };
    

    return (
        <div className="form-container">
            <Toast ref={toast} />

            <Card title="Pico and Placa Predictor" className="p-shadow-6 p-p-4">
                <div className="p-field">
                    <br/>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img src={picoPlacaImage} alt="Pico y Placa" style={{ width: '200px', height: 'auto' }} />
                    </div>
                    <label htmlFor="plate">License Plate Number</label>
                    <InputText
                        id="plate"
                        value={plate}
                        onChange={handlePlateChange}  // Limit to 7 characters
                        placeholder="PBX1234"
                        className={errors.plate ? 'p-invalid' : ''}  // Change color if error
                    />
                    {errors.plate && <Message severity="error" text="License plate is required and must be up to 7 characters." />}
                </div>
                <br/>
                <div className="p-field">
                    <label htmlFor="dateTime">Date and Time</label>
                    <br/>
                    <Calendar
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.value)}
                        showIcon
                        showTime
                        showButtonBar 
                        hourFormat="24"
                        className={errors.dateTime ? 'p-invalid' : ''}  
                    />
                    {errors.dateTime && <Message severity="error" text="Date and time are required." />}
                </div>
                <br/>
                {/* Button to verify the plate */}
                <Button label="Check Pico and Placa" icon="pi pi-check" className="p-button-success" onClick={verifyPicoPlaca} />
                <br/>
                <br/>
                {/* Button to show the rules */}
                <Button label="View Pico and Placa Rules" icon="pi pi-info-circle" className="p-button-link p-mt-3" onClick={() => setShowRules(true)} />

                {/* Dialog to show the Pico and Placa rules */}
                <Dialog header="Pico and Placa Rules" visible={showRules} style={{ width: '50vw' }} onHide={() => setShowRules(false)}>
                    <p>The Pico and Placa restrictions are determined by the last digit of the license plate:</p>
                    <ul>
                        <li><strong>Monday:</strong> Plates ending in 1 and 2.</li>
                        <li><strong>Tuesday:</strong> Plates ending in 3 and 4.</li>
                        <li><strong>Wednesday:</strong> Plates ending in 5 and 6.</li>
                        <li><strong>Thursday:</strong> Plates ending in 7 and 8.</li>
                        <li><strong>Friday:</strong> Plates ending in 9 and 0.</li>
                    </ul>
                    <p>Restricted hours: from 07:00 to 09:30 and from 16:00 to 19:30.</p>
                </Dialog>
            </Card>
        </div>
    );
};

export default PicoPlacaForm;
