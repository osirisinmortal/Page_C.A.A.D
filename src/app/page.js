'use client'

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';
import EnergyInfo from './components/EnergyInfo';
import DataTable from './components/DataTable';
import CalculatorForm from './components/CalculatorForm';
import Dashboard from './components/Dashboard';

const App = () => {
    const [energyData, setEnergyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de datos
        const loadData = async () => {
            try {
                // En una aplicación real, aquí cargarías los datos de una API
                const mockData = [
                    // Datos de ejemplo - en un proyecto real serían los datos completos
                    { year: 2022, wind_generation: 733, solar_energy_consumption: 1050, 
                      hydropower_consumption: 1360, biofuel_production: 120, 
                      installed_geothermal_capacity: 16, share_electricity_wind: 7, 
                      share_electricity_solar: 4, share_electricity_hydro: 15 },
                    // ... más datos históricos
                ];
                setEnergyData(mockData);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Energías Renovables</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/data">Datos</Nav.Link>
                            <Nav.Link as={Link} to="/calculator">Calculadora</Nav.Link>
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="my-5">
                <Routes>
                    <Route path="/" element={<EnergyInfo />} />
                    <Route path="/data" element={<DataTable />} />
                    <Route path="/calculator" element={
                        <>
                            <CalculatorForm data={energyData} />
                            <DataTable />
                        </>
                    } />
                    <Route path="/dashboard" element={
                        loading ? (
                            <div className="text-center my-5">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <Dashboard data={energyData} />
                        )
                    } />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;