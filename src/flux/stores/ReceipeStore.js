import EventEmmiter from 'events'

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

    createTodo(description) {
        const id = new Date()
        this.recipes.push({
            id,
            description,
            rated: '???'
        })
        this.emit('change')
    }
}

const recipeStore = new RecipeStore()

export default recipeStore
