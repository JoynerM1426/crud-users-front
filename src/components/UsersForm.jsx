import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const initialToDo = { first_name: "", last_name: "", email: "", password:"", birthday: "" }

const UsersForm = ({ getUsers, showSuccessNotf, showFailNotf, setIsLoading, userSelected, deselectUser }) => {

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userSelected) reset(userSelected);
        else reset(initialToDo)
    }, [userSelected])

    const submit = (data) => {
        setIsLoading(true);
        if (userSelected) {
            // endpoint PUT -> /songs/:id
            axios.put(`https://users-crud-5ad6.onrender.com/users/${userSelected.id}`, data)
                .then(() => {
                    getUsers();
                    showSuccessNotf("Song updated successfully");
                    deselectUser();
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        } else {
            // endpoint POST -> /songs
            axios.post('https://users-crud-5ad6.onrender.com/users', data)
                .then(() => {
                    getUsers()
                    showSuccessNotf("Song created successfully")
                    reset(initialToDo)
                })
                .catch(() => showFailNotf())
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <Form style={{ maxWidth: 900 }} className="mx-auto mb-5" onSubmit={handleSubmit(submit)}>
            <h1>New User</h1>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="users.first_name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" {...register("first_name")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="users.last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" {...register("last_name")} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="users.email">
                        <Form.Label>email</Form.Label>
                        <Form.Control type="text" {...register("email")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="users.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register("password")} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="users.birthday">
                        <Form.Label>birthday</Form.Label>
                        <Form.Control type="date" {...register("birthday")} />
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit" variant='success' className="mt-3">
                Submit
            </Button>
            {userSelected && (
                <Button onClick={deselectUser} variant="secondary" className="mt-3">
                    Clear
                </Button>
            )}
        </Form>
    );
};

export default UsersForm;