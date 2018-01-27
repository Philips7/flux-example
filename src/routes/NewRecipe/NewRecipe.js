import React, { Component } from 'react'
import { fetchBooks, addBook } from '../../flux/actions/RecipeActions'


export class NewRecipe extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            author: '',
            isbn: '',
            description: '',
            coverPhoto: '',
            rating: ''
        }
        this.handleTitle = this.handleTitle.bind(this)
        this.handleAuthor = this.handleAuthor.bind(this)
        this.handleISBN = this.handleISBN.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleCoverPhoto = this.handleCoverPhoto.bind(this)
        this.handleRating = this.handleRating.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        fetchBooks().then(books => console.log(books)).catch(error => console.log(error))
    }

    addNewBook(book) {
        addBook(book).then(response => console.log(response)).catch(error => console.log(error))
    }

    handleTitle(event) {
        this.setState({ title: event.target.value })
    }

    handleAuthor(event) {
        this.setState({ author: event.target.value })
    }

    handleISBN(event) {
        this.setState({ isbn: event.target.value })
    }

    handleDescription(event) {
        this.setState({ description: event.target.value })
    }

    handleCoverPhoto(event) {
        this.setState({ coverPhoto: event.target.value })
    }

    handleRating(event) {
        this.setState({ rating: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const {
            title,
            author,
            isbn,
            description,
            coverPhoto,
            rating
        } = this.state
        if (title && author && isbn && description && coverPhoto && rating) {
            this.addNewBook({
                title,
                author,
                isbn,
                description,
                coverPhoto,
                rating
            })
        }
    }

    render() {
        return (
            <div>
                HELLO FROM NEW RECIPE
                { /*<RecipesList recipes={ this.state.recipes }/>*/ }
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Title:
                        <input
                            className='form-control'
                            type="text"
                            value={ this.state.value }
                            onChange={ this.handleTitle }/>
                    </label>
                    <label>
                        Author:
                        <input
                            className='form-control'
                            type="text"
                            value={ this.state.value }
                            onChange={ this.handleAuthor }/>
                    </label>
                    <label>
                        ISBN:
                        <input
                            className='form-control'
                            type="text"
                            value={ this.state.value }
                            onChange={ this.handleISBN }/>
                    </label>
                    <label>
                        Description:
                        <input
                            className='form-control'
                            type="text"
                            value={ this.state.value }
                            onChange={ this.handleDescription }/>
                    </label>
                    <label>
                        Description:
                        <input
                            className='form-control'
                            type="text"
                            value={ this.state.value }
                            onChange={ this.handleCoverPhoto }/>
                    </label>
                    <label>
                        Description:
                        <input
                            className='form-control'
                            type="text"
                            value={ this.state.value }
                            onChange={ this.handleRating }/>
                    </label>
                    <button type='submit'>Add a new book</button>
                </form>
            </div>
        )
    }
}
