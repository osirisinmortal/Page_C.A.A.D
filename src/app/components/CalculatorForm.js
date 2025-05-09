import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const CalculatorForm = ({ data }) => {
    const [consumption, setConsumption] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculateRenewablePercentage = () => {
        if (!consumption || isNaN(consumption)) {
            setError('Por favor ingrese un consumo válido');
            return;
        }

        // Supongamos que los datos más recientes son de 2022
        const latestData = data.find(item => item.year === 2022);
        if (!latestData) {
            setError('No se encontraron datos para el cálculo');
            return;
        }

        // Sumar todas las capacidades renovables (simplificado)
        const totalRenewable = 
            (latestData.wind_generation || 0) +
            (latestData.solar_energy_consumption || 0) +
            (latestData.hydropower_consumption || 0) +
            (latestData.biofuel_production || 0) +
            (latestData.installed_geothermal_capacity || 0);

        // Calcular porcentaje (esto es una simplificación)
        const percentage = (totalRenewable / parseFloat(consumption)) * 100;
        
        setResult({
            percentage: percentage.toFixed(2),
            totalRenewable: totalRenewable.toFixed(2)
        });
        setError('');
    };

    return (
        <Container className="my-5">
            <Card>
                <Card.Header as="h5">Calculadora de Energía Renovable</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Consumo eléctrico total (kWh)</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={consumption}
                                onChange={(e) => setConsumption(e.target.value)}
                                placeholder="Ingrese su consumo eléctrico anual"
                            />
                        </Form.Group>

                        {error && <Alert variant="danger">{error}</Alert>}

                        <Button 
                            variant="primary" 
                            onClick={calculateRenewablePercentage}
                        >
                            Calcular
                        </Button>
                    </Form>

                    {result && (
                        <div className="mt-4">
                            <h5>Resultados:</h5>
                            <p>Capacidad renovable total estimada: <strong>{result.totalRenewable} GW</strong></p>
                            <p>Porcentaje de energía renovable en tu consumo: <strong>{result.percentage}%</strong></p>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CalculatorForm;