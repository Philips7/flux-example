import dispatcher from '../Dispatcher'
import { fb } from '../../utils/firebase'

export const createRecipe = (description) => {
    dispatcher.dispatch({
        type: 'CREATE_RECIPE',
        description
    })
}

export const deleteRecipe = (id) => {
    dispatcher.dispatch({
        type: 'CREATE_RECIPE',
        id
    })
}

export const fetchBooks = async () => {
    debugger
    const books = await fb.database().ref('books').once('value')
    debugger
    return books.val()
}
