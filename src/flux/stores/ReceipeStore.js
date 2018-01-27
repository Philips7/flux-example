import EventEmmiter from 'events'
import dispatcher from '../Dispatcher'

class RecipeStore extends EventEmmiter {
    constructor() {
        super()
        this.recipes = [
            {
                id: 34423423,
                description: 'Woow',
                rate: 5
            },
            {
                id: 34436523,
                description: 'Not bad',
                rate: 3
            },
            {
                id: 4543423,
                description: 'Disgousting',
                rate: 2
            }
        ]
    }

    getRecipes() {
        return this.recipes
    }

    createRecipe(description) {
        const id = new Date()
        this.recipes.push({
            id,
            description,
            rated: '???'
        })
        this.emit('change')
    }

    handleActions(action) {
        switch (action.type) {
            case 'CREATE_RECIPE':
                this.createRecipe(action.description)
        }
        console.log('RecipeStore recieved action')
    }
}

const recipeStore = new RecipeStore()
dispatcher.register(recipeStore.handleActions.bind(recipeStore))
window.dispatcher = dispatcher

export default recipeStore
