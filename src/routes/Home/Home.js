import React, { Component } from 'react'
import RecipeStore from '../../flux/stores/ReceipeStore'
import { createRecipe, fetchBooks } from '../../flux/actions/RecipeActions'


export class Home extends Component {
    constructor() {
        super()
        this.state = {
            recipes: RecipeStore.getRecipes()
        }
    }

    componentWillMount() {
        fetchBooks().then(books => console.log(books)).catch(error => console.log(error))
    }

    createNewRecipe() {
        createRecipe(Date.now())
    }

    render() {
        return (
            <div>
                HELLO FROM HOME
                <Recipes recipes={ this.state.recipes }/>
                <button onClick={this.createNewRecipe.bind(this)}>Create</button>
            </div>
        )
    }
}

class Recipes extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        RecipeStore.on('change', () => {
            this.setState({
                recipes: RecipeStore.getRecipes()
            })
        })
    }

    render() {
        return (
            <div>
                { this.props.recipes.map(recipe =>
                    <div key={ recipe.id }>
                        <div>
                            <div>Description</div>
                            <div>{ recipe.description }</div>
                        </div>
                        <div>
                            <div>Rate</div>
                            <div>{ recipe.rate }</div>
                        </div>
                    </div>
                ) }
            </div>
        )
    }
}
