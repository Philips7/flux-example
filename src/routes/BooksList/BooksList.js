import React, { Component } from 'react'

import BookStore from '../../flux/stores/BookStore'
import { fetchBooks } from '../../flux/actions/BooksActions'
import { fb } from '../../utils/firebase'
import './bookList.css'

export class BooksList extends Component {
    constructor() {
        super()
        this.state = {
            books: ''
        }
    }

    componentWillMount() {
        fb.auth().onAuthStateChanged(function (user) {
            if (user) {
                fetchBooks(user.uid)
            }
        })
        BookStore.on('change', () => {
            this.setState({
                books: BookStore.getBooks()
            })
        })
    }

    render() {
        const { books } = this.state
        return (
            <div>
                { console.log(books) }
                { books && books.map(book =>
                    <div key={ book.key }>
                        <div className='card'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img className='card-img-top image' src={ book.coverPhoto }/>
                            </div>
                            <div className='card-block'>
                                <h4 className="card-title text-center">{ book.title }</h4>
                                <div className='row text-center'>
                                    <div className='col-md-6'>Author</div>
                                    <div className='col-md-6'>{ book.author }</div>
                                </div>
                                <div className='row text-center'>
                                    <div className='col-md-6'>ISBN</div>
                                    <div className='col-md-6'>{ book.isbn }</div>
                                </div>
                                <div className='row text-center'>
                                    <div className='col-md-6'>Description</div>
                                    <div className='col-md-6'>{ book.description }</div>
                                </div>
                                <div className='row text-center'>
                                    <div className='col-md-6'>Rating</div>
                                    <div className='col-md-6'>{ book.rating }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
        )
    }
}
