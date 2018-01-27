import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import { NewBook } from '../../routes/NewBook/NewBook'
import { BooksList } from '../../routes/BooksList/BooksList'
import { Login } from '../../routes/Login/Login'
import { SignUp } from '../../routes/SignUp/SignUp'
import './App.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/books/new' component={ NewBook }/>
                    <Route exact path='/books' component={ BooksList }/>
                    <Route path='/login' component={ Login }/>
                    <Route path='/singUp' component={ SignUp }/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
