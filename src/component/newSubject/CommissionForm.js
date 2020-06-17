import React, { useState } from 'react';
import {Button, Form, ListGroup, Card, Row, Col} from 'react-bootstrap';
import './CommissionForm.css';
import ScheduleForm from './ScheduleForm';
import ScheduleItem from './ScheduleItem';

// note: sch as schedule

export default function CommissionForm({addCommission}) {
    // aux functions
    const allIds = () => { return schedules.map( (schedule) => schedule.id)};

    // modal logic
    const [showModalSchedule,setShowModalSchedule] = useState(false);
    const closeModalSchedule = () =>{ setShowModalSchedule(false); }
    const openCloseModal = () => { setShowModalSchedule(true); }

    // schedule logic
    const [schedules, setSchedules] = useState([]);
    const addSchedule = (newSchedule) => {
        setSchedules([...schedules,newSchedule]);
    };

    // VER
    const deleteSchedule = (id) => {
        let indexSchDelete = allIds().indexOf(id);
        schedules.splice(indexSchDelete,1);
    }

    // VER
    const modifySchedule = (schedule) => {
        // openCloseModal();
        // deleteSchedule(schedule.id);
    }

    // commission logic
    const [name,setName] = useState('');
    const [year,setYear] = useState('2020');
    const [semester, setSemester] = useState('Primer cuatrimestre');
    
    const commission = {
        name,
        semester,
        year,
        schedules
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCommission(commission,cleanUpCommission);
        return;
    }

    const cleanUpCommission = () => { 
        setName(" ");
        setYear("2020");
        setSemester("Primer cuatrimestre");
        setSchedules([]);
    }

    return (
        <>
            <form data-toggle="validator" role="form" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={8}><h2>Comisiones</h2></Col>    
                    <Col xs={4}><Button className="btn btn-danger"  type="submit">Agregar commisión</Button></Col>    
                </Row>
                
                
                <Form.Group>
                    <Form.Label>Nombre comisión</Form.Label>
                    <Form.Control 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Año</Form.Label>
                    <Form.Control 
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Semestre</Form.Label>
                    <Form.Control 
                        as="select"
                        value={semester}
                        onChange={ (e) => setSemester(e.target.value)} >
                        <option>Primer cuatrimestre</option>
                        <option>Segundo cuatrimestre</option>
                        <option>Anual</option>
                    </Form.Control>
                </Form.Group>
            </form>

            {/* schedule section */}

            <h3>Schedules</h3>

            <Card id="addedSchedulesSection">
                <Card.Header>Schedules agregados</Card.Header>
                <ListGroup>
                    { schedules.length === 0 ?
                        <ListGroup.Item>
                            <p>
                                No ha agregado schedules aún
                            </p>
                            
                        </ListGroup.Item>

                        :
                        schedules.map( function(sch){
                            return <ScheduleItem schedule={sch} 
                                                 deleteSchedule={deleteSchedule}
                                                 modifySchedule={modifySchedule} />;
                        })
                    }
                    
                </ListGroup>
            </Card>

            <Button className="btn btn-danger" onClick={ () => openCloseModal()}>Agregar schedule</Button>
            <ScheduleForm show={showModalSchedule} 
                            onHide={closeModalSchedule}
                            addSchedule={addSchedule}
                            
            />

        </>
    );
}