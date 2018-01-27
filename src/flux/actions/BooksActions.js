import dispatcher from '../Dispatcher'
import { fb } from '../../utils/firebase'
import {
    ADD_BOOK_SUCCESS,
    ADD_BOOK_ATTEMPT,
    ADD_BOOK_ERROR,
    GET_BOOKS_ATTEMPT,
    GET_BOOKS_SUCCESS,
    GET_BOOKS_ERROR
} from '../stores/BookStore'
import BookStore from '../stores/BookStore'
import { extractSnap, extractSnaps, objToArrayExplicit } from '../../utils/firebaseHelpers'

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

export const fetchBooks = async (uid) => {
    dispatcher.dispatch({ type: GET_BOOKS_ATTEMPT })
    try {
        const user = await fb.auth().currentUser
        if (user) {
            const booksSnap = await fb.database().ref(`books/${uid}`).once('value')
            const booksObj = extractSnap(booksSnap)
            const books = objToArrayExplicit(booksObj)
            dispatcher.dispatch({ type: GET_BOOKS_SUCCESS, books: books.slice(0, -1) })
        } else {
            throw new Error('Not authenticated')
        }
    } catch (error) {
        dispatcher.dispatch({ type: GET_BOOKS_ERROR, error: error.message })
    }
}

export const fetchAllBooks = async () => {
    const books = await fb.database().ref(`books/qA27iFtuEmMoKpwTBLTatnmysBA2`).once('value')
    return books.val()
}
