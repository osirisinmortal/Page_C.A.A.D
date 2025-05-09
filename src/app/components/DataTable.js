import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // En un proyecto real, aquí iría la URL de tu API o archivo JSON
                const response = await axios.get('/data/energy-data.json');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <Container className="text-center my-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Container className="my-5">
            <Alert variant="danger">
                Error al cargar los datos: {error}
            </Alert>
        </Container>
    );

    return (
        <Container className="my-5">
            <h2 className="mb-4">Datos Históricos de Energía Renovable (1965-2022)</h2>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Año</th>
                            <th>Energía Eólica (GW)</th>
                            <th>Energía Solar (GW)</th>
                            <th>Hidroeléctrica (GW)</th>
                            <th>Biocombustibles (GW)</th>
                            <th>Geotérmica (GW)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.year}</td>
                                <td>{item.wind_generation}</td>
                                <td>{item.solar_energy_consumption}</td>
                                <td>{item.hydropower_consumption}</td>
                                <td>{item.biofuel_production}</td>
                                <td>{item.installed_geothermal_capacity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default DataTable;