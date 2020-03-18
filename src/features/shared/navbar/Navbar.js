import SettingsIcon from '@material-ui/icons/Settings';
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import './navbar.css';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        // If we are at the login page, don't render the navbar
        if (location.pathname === '/') {
            return (
                <div></div>
            );
        }

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
                        <Nav.Link href='/notes'>Notes</Nav.Link>
                        <Nav.Link href='/chat'>Chat</Nav.Link>
                    </Nav>
                    <Button variant='outline-info'><SettingsIcon /></Button>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;