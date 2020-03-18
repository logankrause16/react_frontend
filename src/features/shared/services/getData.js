import React, { Component } from 'react';

class Getdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        items: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <h1>{ this.state.items.title }</h1>
            </div>
        )
    }
}

export default Getdata;