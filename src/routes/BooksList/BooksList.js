import React, { Component } from 'react'

import BookStore from '../../flux/stores/BookStore'
import { fetchBooks } from '../../flux/actions/BooksActions'
import { fb } from '../../utils/firebase'
import './bookList.css'
import { Pagination } from '../../components/Pagination/Pagination'

export class BooksList extends Component {
    constructor() {
        super()
        this.state = {
            books: '',
            perPage: 2,
            currentPage: 0,
            totalCount: 0
        }
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)

    }

    componentWillMount() {
        fb.auth().onAuthStateChanged(function (user) {
            if (user) {
                fetchBooks(user.uid)
            }
        })
        BookStore.on('change', () => {
            this.setState({
                books: BookStore.getBooks(),
            })
            this.setState({
                totalCount: this.state.books.length
            })
        })
    }

    prev = () => {
        if (this.state.currentPage > 0) {
            this.setState({
                currentPage: --this.state.currentPage
            })
        }
    }

    next = () => {
        let { currentPage } = this.state
        if (this.state.perPage * ++currentPage < this.state.totalCount) {
            this.setState({
                currentPage: ++this.state.currentPage
            })
        }
    }

    render() {
        const { books, currentPage, perPage } = this.state
        const start = currentPage * perPage
        const end = (currentPage * perPage) + perPage
        return (
            <div>
                <Pagination prev={ this.prev } next={ this.next } currentPage={ currentPage }
                            perPage={ this.state.perPage }>
                    { books && books.slice(start, end).map(book =>
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
                </Pagination>
            </div>
        )
    }
}
