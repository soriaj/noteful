import React, { Component } from 'react';
import Config from '../Config';
import NoteContext from '../NoteContext'
// import uuid from 'uuid';
import ValidationError from '../ValidationError/ValidationError';
import './AddFolder.css'

const Required = () => (
   <span className='AddBookmark__required'>*</span>
)

const uuid4 = require('uuid/v4')

class AddFolder extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: null,
         name: {
            value: '',
         },
      }
   }
   static contextType = NoteContext;
   updateName(name){
      this.setState({ name: { value: name, touched: true }})
   }
   validateName() {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return "Name is required";
      } else if (name.length < 3) {
        return "Name must be at least 3 characters long";
      }
   }
   handleSubmit(e){
      e.preventDefault();
      console.log(`Submit was clicked`)
      // const { name } = e.target
      const folder = {
         id: uuid4(),
         name: this.state.name.value
      }
      fetch(`${Config.API_ENDPOINT}/folders`, {
         method: 'POST',
         body: JSON.stringify(folder),
         headers: {
            'content-type': 'application/json'
         }
      })
      .then(res => {
         if(!res.ok){
            return res.json().then(error => {
               throw error
            })
         }
         return res.json()
      })
      .then(data => {
         this.context.addFolders(data)
         this.props.history.push('/')
      })
      .catch(error => {
         this.setState({error})
      })
   }
   handleClickCancel = () => {
      this.props.history.push('/')
   }
   render() {
      // console.log(this.context)
      const nameError = this.validateName();
      return (
         <>
            <nav></nav>
            <section className='add__folder'>
               <h2>Create a Folder</h2>
               {this.state.name.touched && <ValidationError message={nameError} />}
               <form
                  className='AddFolder__form'
                  onSubmit={e => this.handleSubmit(e)}
               >
                  <div>
                     <label htmlFor='name'>
                     Name
                     {' '}
                     <Required />
                     </label>
                     <input
                     type='text'
                     name='name'
                     id='name'
                     placeholder='Folder Name'
                     onChange={e => this.updateName(e.target.value)}
                     />
                  </div>
                  
                  <div className='AddBookmark__buttons'>
                     <button type='button' onClick={this.handleClickCancel} >
                     Cancel
                     </button>
                     {' '}
                     <button 
                        type='submit'
                        disabled={
                           this.validateName()
                        }>
                     Save
                     </button>
                  </div>
               </form>
            </section>
         </>
      );
   }
}

export default AddFolder;