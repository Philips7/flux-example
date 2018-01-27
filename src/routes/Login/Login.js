import React, { Component } from 'react'
import { fb } from '../../utils/firebase'

const login = async (email, password) => {
    try {
        fb.auth().signInWithEmailAndPassword(email, password).then(() => window.location.href='/')
    } catch (error) {
        console.log(error)
    }
}

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '' }

        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmail(event) {
        this.setState({ email: event.target.value })
    }

    handlePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { email, password } = this.state
        if (email && password) {
            login(email, password)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Email:
                        <input
                            className='form-control'
                            type="email"
                            value={ this.state.value }
                            onChange={ this.handleEmail }/>
                    </label>
                    <label>
                        Password:
                        <input
                            className='form-control'
                            type="password"
                            value={ this.state.value }
                            onChange={ this.handlePassword }/>
                    </label>
                    <button
                        className='btn btn-primary'
                        type="submit"
                    >Sign Up
                    </button>
                </form>
            </div>
        )
    }
}
