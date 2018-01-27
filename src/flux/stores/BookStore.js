import EventEmmiter from 'events'

import dispatcher from '../Dispatcher'
import { fb } from '../../utils/firebase'

// ACTIONS
export const ADD_BOOK_ATTEMPT = 'Books.ADD_BOOK_ATTEMPT'
export const ADD_BOOK_SUCCESS = 'Books.ADD_BOOK_SUCCESS'
export const ADD_BOOK_ERROR = 'Books.ADD_BOOK_ERROR'

export const GET_BOOKS_ATTEMPT = 'Books.GET_BOOK_ATTEMPT'
export const GET_BOOKS_SUCCESS = 'Books.GET_BOOK_SUCCESS'
export const GET_BOOKS_ERROR = 'Books.GET_BOOK_ERROR'

/// STORE
class BookStore extends EventEmmiter {
    constructor() {
        super()
        fb.auth().onAuthStateChanged(function (user) {
            if (user) {
                this.user = user
                console.log('LOGGED', user)
            } else {
                this.user = null
                console.log('LOGGED out')
            }
        })
        this.books = []
        this.loading = false
        this.error = null
        this.user = null
    }

    getBooks() {
        return this.books
    }

    pushBooks(books) {
        this.books = books
        this.emit('change')
    }

    handleActions(action) {
        switch (action.type) {
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
            case GET_BOOKS_ATTEMPT:
                this.loading = true
                break
            case GET_BOOKS_SUCCESS:
                this.books = this.pushBooks(action.books)
                this.loading = false
                break
            case GET_BOOKS_ERROR:
                this.loading = false
                this.error = action.error
                break
            default:
                break
        }
        console.log('Book store: ', action)
    }
}

const bookStore = new BookStore()
dispatcher.register(bookStore.handleActions.bind(bookStore))

export default bookStore
