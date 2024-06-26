import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const DEFAULT_IMAGE_URL = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

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
            const firmData = response.data;
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
            <h2 className="text-center m-4"> Фирма "{firm.name}"</h2>
        { /*Firm.id */ }
            <Row className="m-2" key={firm.id}>
                { /*Firm.logoUrl */ }
                <Col md="3">
                    <img className="mr-3 img-thumbnail" 
                    src={firm.logoUrl || DEFAULT_IMAGE_URL} 
                    alt="Логотип" />
                </Col>
                <Col md="9">
                        { /*Firm.description */ }
                        <p>{firm.description}</p>
                        { /*Firm.link */ }
                        <p>
                            <span className="fst-italic">Ссылка на сайт: </span> 
                            <a href={firm.link || '#'} target='_blank' rel="noopener noreferrer">{firm.link}</a>                            
                        </p>
                            { /*Firm.cities */ }
                        <p>Города: {firm.cities}</p>
                            { /*Firm.languages */ }
                        <p>Изучаемые языки: {firm.languages}</p>                        
                    <Link to={`/firms`} className="me-1">
                        Вернуться к списку фирм
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}
