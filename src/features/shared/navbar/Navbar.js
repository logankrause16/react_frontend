import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './navbar.css';

class NavBar extends Component {

    render() {
        return (
            <div>
                <Navbar bg='dark' variant='dark'>
                    <Navbar.Brand href=''>Sidebar</Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/map'>Map</Nav.Link>
                        <Nav.Link href='/gfm'>GFM</Nav.Link>
                        <Nav.Link href='/contract'>Contract</Nav.Link>
                        <Nav.Link href='/constraints'>constraints</Nav.Link>
                        <Nav.Link href='/rfi'>RFI</Nav.Link>
                        <Nav.Link href='/ato'>Raw ATO</Nav.Link>
                        <Nav.Link href='/notes'>Notes</Nav.Link>
                        <Nav.Link href='/chat'>Chat</Nav.Link>
                    </Nav>
                    <Button variant='outline-info'>Cog Icon</Button>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;