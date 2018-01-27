import React, { Component } from 'react'

import RecipeStore from '../../flux/stores/ReceipeStore'

export class RecipesList extends Component {
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
