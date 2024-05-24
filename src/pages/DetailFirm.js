import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function DetailFirm() {
    const [firm, setFirm] = React.useState({});
    const [user, setUser] = React.useState({});
    const [name, setName] = React.useState('');
    const [userId, setUserId] = React.useState('');
    const { id } = useParams();

    useEffect(() => {
        getMe();
        getFirmById();
    }, []);
    
    const getMe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                setName(decoded.name);
                setUserId(decoded.userId);
            }
        } catch (error) {
            console.error('Ошибка проверки данных пользователя:',error.message);
        }
    };

    const getFirmById = async () => {
        try {
            const response = await axios.get(`https://backend1k-36eab103aeb1.herokuapp.com/firms/${id}`);
            const firmData = response.data.map.data;
            console.log('Response data:', firmData);
            setFirm(firmData);
            setUser(firmData.user);
        } catch (error) {
            console.error('Ошибка чтения данных:', error.message);
        }
    };


    return (
        <Container className="mt-1">
        { /*Firm.name */ }
            <h2 className="text-center m-4"> Фирма "{firmData.name}"</h2>
        { /*Firm.id */ }
            <Row className="m-2" key={firmData.id}>
                { /*Firm.logoUrl */ }
                <Col md="3">
                    <img className="mr-3 img-thumbnail" 
                    src={firmData.logoUrl || ''} 
                    alt="Логотип" />
                </Col>
                <Col md="9">
                        { /*Firm.description */ }
                        <p>{firmData.description}</p>
                        { /*Firm.link */ }
                        <p>
                            <span className="fst-italic">Ссылка на сайт: </span> 
                            <a href={firmData.link || '#'} target='_blank' rel="noopener noreferrer">{firmData.link}</a>                            
                        </p>
                            { /*Firm.cities */ }
                        <p>Города: {firmData.cities}</p>
                            { /*Firm.languages */ }
                        <p>Изучаемые языки: {firmData.languages}</p>                        
                    <Link to={`/firms`} className="me-1">
                        Вернуться к списку фирм
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}
