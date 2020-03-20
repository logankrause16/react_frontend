import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ConstraintModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentFile: null
        }
    }

    render() {
        return (    
            <>
                <Button variant='primary' onClick={() => this.setState({ showModal: true })}>
                    Modal
                </Button>

                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header>
                        <Modal.Title>Constraint Modal</Modal.Title>
                    </Modal.Header>    
                    <Modal.Body>
                        Upload a constraint structure
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => this.setState({ showModal: false })}>Close</Button>
                        <Button variant='primary' onClick={() => this.setState({ showModal: false })}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default ConstraintModal;