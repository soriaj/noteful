import React, { Component } from 'react';
// import SidebarPage from '../SidebarPage/SidebarPage';
// import SidebarList from '../SidebarList/SiderbarList';
import Config from '../Config';
import NoteContext from '../NoteContext'
import uuid from 'uuid';
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
         id: {
            value: '',
         }
      }
   }
   static contextType = NoteContext;
   updateName(name){
      this.setState({ name: { value: name, touched: true }})
   }
   updateStateValues(id, name){
      this.setState({
         name: {value: name},
         id: {value: id}
      })
   }
   handleSubmit(e){
      e.preventDefault();
      console.log(`Submit was clicked`)
      const { name } = e.target
      const folder = {
         id: uuid4(),
         name: name.value
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
      return (
         <>
            <nav></nav>
            <section className='add__folder'>
               <h2>Create a Folder</h2>
               <form
                  className='AddFolder__form'
                  onSubmit={e => this.handleSubmit(e)}
               >
                  {/* <div className='AddBookmark__error' role='alert'>
                     {this.state.error && <p>{this.state.error}</p>}
                  </div> */}
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
                     // onChange={e => this.updateName(e.target.value)}
                     required
                     />
                  </div>
                  
                  <div className='AddBookmark__buttons'>
                     {/* <button type='button' onClick={onClickCancel}> */}
                     <button type='button' onClick={this.handleClickCancel} >
                     Cancel
                     </button>
                     {' '}
                     <button type='submit'>
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