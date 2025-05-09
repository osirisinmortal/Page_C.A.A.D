import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

const Dashboard = ({ data }) => {
    // Filtrar datos solo del último año para algunos gráficos
    const latestYearData = data.find(item => item.year === 2022) || {};
    
    // Preparar datos para los gráficos
    const barChartData = {
        labels: ['Eólica', 'Solar', 'Hidroeléctrica', 'Biocombustibles', 'Geotérmica'],
        datasets: [
            {
                label: 'Producción de Energía (GW)',
                data: [
                    latestYearData.wind_generation,
                    latestYearData.solar_energy_consumption,
                    latestYearData.hydropower_consumption,
                    latestYearData.biofuel_production,
                    latestYearData.installed_geothermal_capacity
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const pieChartData = {
        labels: ['Eólica', 'Solar', 'Hidroeléctrica', 'Otras'],
        datasets: [
            {
                data: [
                    latestYearData.share_electricity_wind,
                    latestYearData.share_electricity_solar,
                    latestYearData.share_electricity_hydro,
                    100 - (latestYearData.share_electricity_wind + 
                          latestYearData.share_electricity_solar + 
                          latestYearData.share_electricity_hydro)
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    // Preparar datos para el gráfico de líneas (tendencia)
    const last10Years = data.filter(item => item.year >= 2013);
    const lineChartData = {
        labels: last10Years.map(item => item.year),
        datasets: [
            {
                label: 'Eólica (GW)',
                data: last10Years.map(item => item.cumulative_installed_wind_energy_capacity_gigawatts),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                fill: true,
                tension: 0.1
            },
            {
                label: 'Solar (GW)',
                data: last10Years.map(item => item.installed_solar_PV_capacity),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.1)',
                fill: true,
                tension: 0.1
            },
            {
                label: 'Geotérmica (GW)',
                data: last10Years.map(item => item.installed_geothermal_capacity),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.1)',
                fill: true,
                tension: 0.1
            }
        ]
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">Dashboard de Energía Renovable</h1>
            
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Producción por Fuente (2022)</Card.Title>
                            <div style={{ height: '300px' }}>
                                <Bar 
                                    data={barChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top'
                                            },
                                            title: {
                                                display: true,
                                                text: 'Producción de Energía Renovable por Fuente'
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Participación de Energías Renovables</Card.Title>
                            <div style={{ height: '300px' }}>
                                <Pie 
                                    data={pieChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'right'
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Tendencia en Capacidad Instalada (2013-2022)</Card.Title>
                            <div style={{ height: '400px' }}>
                                <Line 
                                    data={lineChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'top'
                                            },
                                            title: {
                                                display: true,
                                                text: 'Evolución de la Capacidad Instalada'
                                            }
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;