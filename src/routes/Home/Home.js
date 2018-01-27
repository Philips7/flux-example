import React, { Component } from 'react'
import RecipeStore from '../../flux/stores/ReceipeStore'

export class Home extends Component {
    constructor() {
        super()
        this.state = {
            recipes: RecipeStore.getRecipes()
        }
    }

    render() {
        return (
            <div>
                HELLO FROM HOME
                <Recipes recipes={ this.state.recipes }/>
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
                    <div key={recipe.id}>
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
