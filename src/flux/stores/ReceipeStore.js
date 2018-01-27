import EventEmmiter from 'events'

import dispatcher from '../Dispatcher'
import { fb } from '../../utils/firebase'

export const ADD_BOOK_ATTEMPT = 'Books.ADD_BOOK_ATTEMPT'
export const ADD_BOOK_SUCCESS = 'Books.ADD_BOOK_SUCCESS'
export const ADD_BOOK_ERROR = 'Books.ADD_BOOK_ERROR'

class RecipeStore extends EventEmmiter {
    constructor() {
        super()
        fb.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.user = user
                console.log('LOGGED',user)
            } else {
                this.user = null
                console.log('LOGGED out')
            }
        });
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
        this.loading = false
        this.error = null
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
                break
            case ADD_BOOK_ATTEMPT:
                this.loading = true
                break
            case ADD_BOOK_SUCCESS:
                this.loading = false
                break
            case ADD_BOOK_ERROR:
                this.loading = false
                this.error = action.error
                break
            default:
                break
        }
        console.log('Book store: ', action)
    }
}

const recipeStore = new RecipeStore()
dispatcher.register(recipeStore.handleActions.bind(recipeStore))

export default recipeStore
