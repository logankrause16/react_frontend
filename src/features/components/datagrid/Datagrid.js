import React, { Component } from 'react';
import './datagrid.css';

class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
    }

    dragStart(e) {
        console.log(e);
    }

    dragEnd(e) {
        console.log(e);
    }

    render() {
        return (
            <h1>Datagrid!</h1>
        );
    }
}

export default DataGrid;