import axios from 'axios';
import React from 'react';
import { Badge, Button, ListGroup, Table } from 'react-bootstrap';

const UsersList = ({ users, getUsers, showSuccessNotf, showFailNotf, setIsLoading, selectUser }) => {

    const deleteSong = (id) => {
        setIsLoading(true);
        // endpoint DELETE -> /songs/:id
        axios.delete(`https://users-crud-5ad6.onrender.com/users/${id}`)
            .then(() => {
                getUsers();
                showSuccessNotf("Song removed successfully");
            })
            .catch(() => showFailNotf())
            .finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Second Name</th>
                        <th>E-mail</th>
                        <th>Password</th>
                        <th>Birthrday</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>   
                {
                    users.map(user => {
                        // const releaseDate = new Date(user.releaseDate)
                        //     .toLocaleDateString('en-us', {day: 'numeric', month: 'long', year: 'numeric'})

                        return (
                            <tr  key={user.id}>
                                <td >{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.birthday}</td>
                                <td>
                                    <Button 
                                        variant='danger'
                                        size='sm'
                                        className="me-1"
                                        onClick={() => deleteSong(user.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button 
                                        variant='primary'
                                        size='sm'
                                        onClick={() => selectUser(user)}
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </div>
    );
};

export default UsersList;