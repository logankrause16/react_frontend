import SettingsIcon from '@material-ui/icons/Settings';
import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import UploadModal from '../navbar/upload-modal/UploadModal';
import { NavDropdown } from 'react-bootstrap';
import Sidebar from './side-bar/Sidebar';
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
                    <Navbar.Brand><Sidebar /></Navbar.Brand>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/map'>Map</Nav.Link>
                        <Nav.Link href='/gfm'>GFM</Nav.Link>
                        <Nav.Link href='/contracts'>Contract</Nav.Link>
                        <Nav.Link href='/constraints'>Constraints</Nav.Link>
                        <Nav.Link href='/rfi'>RFI</Nav.Link>
                        <Nav.Link href='/notes'>Notes</Nav.Link>
                        <Nav.Link href='/chat'>Chat</Nav.Link>
                        <NavDropdown title='Mission' id='basic-nav-dropdown'>
                            <NavDropdown.Item><UploadModal /></NavDropdown.Item>
                            <NavDropdown.Item>View List</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button variant='outline-info'><SettingsIcon /></Button>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;