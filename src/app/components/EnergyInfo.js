import React from 'react';
import { Card, Container, Row, Col, Image, Tab, Tabs } from 'react-bootstrap';

const EnergyInfo = () => {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Energía Solar</h1>
            
            <Row className="mb-4">
                <Col md={6}>
                    <Image src="https://via.placeholder.com/600x400" fluid rounded />
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>¿Qué es la energía solar?</Card.Title>
                            <Card.Text>
                                La energía solar es una fuente de energía renovable que se obtiene del 
                                aprovechamiento de la radiación electromagnética procedente del Sol. 
                                Es una de las energías más limpias y abundantes disponibles en nuestro planeta.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Tabs defaultActiveKey="benefits" id="energy-tabs" className="mb-3">
                <Tab eventKey="benefits" title="Beneficios">
                    <Card>
                        <Card.Body>
                            <ul>
                                <li>Reducción de emisiones de CO2</li>
                                <li>Fuente inagotable de energía</li>
                                <li>Bajo costo de mantenimiento</li>
                                <li>Generación distribuida</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="data" title="Datos Globales">
                    <Card>
                        <Card.Body>
                            <p>Según los datos de 2022:</p>
                            <ul>
                                <li>Capacidad instalada global: 1,185 GW</li>
                                <li>Participación en generación eléctrica: ~4.5%</li>
                                <li>Crecimiento anual promedio: 25%</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="future" title="Futuro">
                    <Card>
                        <Card.Body>
                            <p>Perspectivas para 2030:</p>
                            <ul>
                                <li>Se espera que sea la fuente más barata de energía</li>
                                <li>Podría cubrir hasta el 20% de la demanda global</li>
                                <li>Tecnologías emergentes como paneles transparentes</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default EnergyInfo;