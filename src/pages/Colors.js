import React, {Component} from 'react';
import { Card, Button, Container, Row, Col, Jumbotron, Form, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Colors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            isLoaded: false,
            formColor: {
                name: '',
                hex: ''
            },
            showMessage: false,
            message: ''
        }
    }
    
    componentDidMount() {
        this.getAllColors();
    }

    getAllColors() {
        axios.get('http://127.0.0.1:8000/api/colors')
        .then(response => {
            this.setState({
                isLoaded: true,
                colors: response.data,
                formColor: {
                    name: '',
                    hex: ''
                },
                showMessage: false,
                message: ''
            })
        })
    }

    deleteColor = event => {
        axios.delete(`http://127.0.0.1:8000/api/colors/${event.target.value}`)
            .then(res => {
                let newArr = this.state.colors.filter((value, index, arr) => {
                    return value.id != res.data;
                })

                this.setState({
                    isLoaded: true,
                    colors: newArr,
                    formColor: {
                        name: '',
                        hex: ''
                    },
                    showMessage: false,
                    message: ''
                })
            })
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/colors`, this.state.formColor)
            .then(response => {
                this.setState({
                    colors: [...this.state.colors, response.data],
                    showMessage: true,
                    message: `Color ${response.data.name} successfully inserted.`
                })
                
                this.setState({
                    formColor: {
                        name: '',
                        hex: ''
                    }
                })
            })
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({
            formColor: {
                ...this.state.formColor,
                [event.target.name]: event.target.value 
            },
            showMessage: false,
            message: ''
            
        })
        
    }

    render() {

        let { isLoaded, colors, showMessage, message } = this.state;

        if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Color name</Form.Label>
                            <Form.Control type="text" placeholder="Enter color name" name="name" onChange={this.handleChange} value={this.state.formColor.name} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Color name</Form.Label>
                            <Form.Control type="text" placeholder="Enter color name"  name="hex" onChange={this.handleChange} value={this.state.formColor.hex} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                    <br/>
                    {showMessage ? 
                        <Alert >
                            {message}
                        </Alert>: ''}
                    
                    <br/>
                    <Table striped bordered hover>
                      <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Hex value</th>
                            <th></th>
                          </tr>
                      </thead>
                      <tbody>
                         {colors.map(color => (
                             <tr key={color.id}>
                                 <td>{color.id}</td>
                                 <td>{color.name}</td>
                                 <td>{color.hex}</td>
                                 <td>
                                    <Button variant="danger" onClick={this.deleteColor} value={color.id}>Remove</Button>
                                </td>
                             </tr>
                         ))}
                      </tbody>
                      </Table>
                </Container>
            )
        }

      
    }
}

export default Colors;