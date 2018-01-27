import React, { Component } from 'react'

import { fb } from '../../utils/firebase'
import { postUser } from '../../firebaseActions/postUser'

const signUp = (email, password) => {
    fb.auth().createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
            const { uid, email } = response
            postUser(uid, email)
        })
        .catch(function (error) {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorMessage)
        })
}

export class SignUp extends Component {
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
        console.log(this.state.email, this.state.password)
        const { email, password } = this.state
        if (email && password) {
            signUp(email, password)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Name:
                        <input type="text" value={ this.state.value } onChange={ this.handleEmail }/>
                        <input type="text" value={ this.state.value } onChange={ this.handlePassword }/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <button className='btn btn-primary'>SIGN IN</button>
            </div>
        )
    }
}