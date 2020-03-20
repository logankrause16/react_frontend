import React, { Component } from 'react';
import Dehaze from '@material-ui/icons/Dehaze';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './side-bar.css';

/*
*/

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
            currentFile: null
        }
    }

    render() {

        console.log(this.state.showSidebar);

        return (
            <>
                <div onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}>
                    <Dehaze />
                </div>
                { this.state.showSidebar ? 
                        <Navbar bg='dark' variant='dark'>
                            <Nav className='mr-auto'>
                                <Nav.Link href=''>Sidebar 1</Nav.Link>
                                <Nav.Link href='/gfm'>Sidebar 2</Nav.Link>
                                <NavDropdown title='Uploady Load' id='basic-nav-dropdown'>
                                    <NavDropdown.Item>Item</NavDropdown.Item>
                                    <NavDropdown.Item>View List</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar>

                : null }
            </>
        );
    }

}

export default Sidebar;