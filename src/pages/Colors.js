import React, {Component} from 'react';
import { Card, Button, Container, Row, Col, Jumbotron, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Colors extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            isLoaded: false
        }
    }
    
    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/colors')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isLoaded: true,
                    colors: json
                })
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
                             <tr>
                                 <td>{color.id}</td>
                                 <td>{color.name}</td>
                                 <td>{color.hex}</td>
                                 <td></td>
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