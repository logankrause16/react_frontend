import React, { Component } from 'react';
import Datagrid from '../../shared/datagrid/Datagrid';

class Constraints extends Component {

    constructor() {
        super();
        this.state = {
            headers: ["Constraint Type", "Constraint"],
            data: [
                { "constraint": 1, "type": "Test1" },
                { "constraint": 2, "type": "Test2" },
                { "constraint": 3, "type": "Test3" },
                { "constraint": 4, "type": "Test4" }
            ]
        }
    }
    render() {
        return (
            <div>
                <Datagrid tableName="constraints" headers={this.state.headers} data={this.state.data} />
            </div>
        );
    }
}

export default Constraints;