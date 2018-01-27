import dispatcher from '../Dispatcher'
import { fb } from '../../utils/firebase'
import { ADD_BOOK_SUCCESS, ADD_BOOK_ATTEMPT, ADD_BOOK_ERROR } from '../stores/ReceipeStore'

export const addBook = async (book) => {
    dispatcher.dispatch({ type: ADD_BOOK_ATTEMPT })
    try {
        const user = await fb.auth().currentUser
        if (user) {
            const createdBook = await fb.database().ref(`books/${user.uid}`).push(book)
            await fb.database().ref(`users/${user.uid}/books`).push(createdBook.key)
            dispatcher.dispatch({ type: ADD_BOOK_SUCCESS })
        } else {
            throw new Error('Not authenticated')
        }
    } catch (error) {
        dispatcher.dispatch({ type: ADD_BOOK_ERROR, error: error.message })
    }
}

export const fetchBooks = async () => {
    const books = await fb.database().ref(`books/qA27iFtuEmMoKpwTBLTatnmysBA2`).once('value')
    return books.val()
}
