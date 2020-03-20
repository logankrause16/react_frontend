import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UploadModal extends Component {
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
                <div onClick={() => this.setState({ showModal: true })}>
                    Upload File
                </div>
    
                <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
                    <Modal.Header>
                        <Modal.Title>Upload File</Modal.Title>
                    </Modal.Header>    
                    <Modal.Body>
                        Please Upload a flippin file
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

export default UploadModal;