import React, { Component } from 'react'

export class Pagination extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                { this.props.children }
                <button onClick={ this.props.prev }>PREV</button>
                <button onClick={ this.props.next }>NEXT</button>
            </div>
        )
    }
}
