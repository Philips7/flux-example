import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'


import { NewRecipe } from '../../routes/NewRecipe/NewRecipe'
import { Login } from '../../routes/Login/Login'
import { SignUp } from '../../routes/SignUp/SignUp'
import './App.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ NewRecipe }/>
                    <Route path='/login' component={ Login }/>
                    <Route path='/singUp' component={ SignUp }/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
