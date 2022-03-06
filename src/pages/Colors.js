import React, {Component} from 'react';
import { Card, Button, Container, Row, Col, Jumbotron, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Colors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            isLoaded: false
        }
    }
    
    componentDidMount() {
        this.getAllColors();
    }

    getAllColors() {
        axios.get('http://127.0.0.1:8000/api/colors')
        .then(response => {
            console.log(response);
            this.setState({
                isLoaded: true,
                colors: response.data
            })
        })
    }

    deleteColor = event => {
        axios.delete(`http://127.0.0.1:8000/api/colors/${event.target.value}`)
            .then(res => {
                this.getAllColors();
            })
    }

    render() {

        let { isLoaded, colors } = this.state;

        if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <Container>
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