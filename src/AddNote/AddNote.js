import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import Config from '../Config';
// import uuid from 'uuid';
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css'

const uuid4 = require('uuid/v4')

class AddNote extends Component {
   constructor(props) {
      super(props);
      this.state ={
         error: null,
         selected: '',
         name: {
            value: '',
            touched: false
         },
         content: {
            value: '',
            touched: false
         },
         folder: {
            value: '',
            touched: false
         }
      }
   }
   static contextType = NoteContext

   updateNoteName(name){
      this.setState({ name: {value: name, touched: true }})
   }
   updateNoteContent(content){
      this.setState({ content: {value: content, touched: true }})
   }
   updateNoteFolder(folder){
      this.setState({ folder: {value: folder, touched: true }})
   }
   changeSelection(value){
      if(value === 'None'){
         this.setState({
            selected: null
         })
      } else {
         const folderId = this.context.folders.find(folder => folder.name === value).id
         this.setState({
            selected: folderId
         })   
      } 
   }
   validateName() {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return "Name is required";
      } else if (name.length < 3) {
        return "Name must be at least 3 characters long";
      }
   }
   validateContent(){
      const content = this.state.content.value.trim();
      if(content.length === 0){
         return "Content is required"
      }
   }
   validateFolder(){
      const folder = this.state.selected
      if(folder === null){
         return "A folder is required"
      }
   }
   handleNoteSubmit(event){
      event.preventDefault()
      const note = {
         id: uuid4(),
         name: this.state.name.value,
         modified: new Date(),
         folderId: this.state.selected,
         content: this.state.content.value

      }
      fetch(`${Config.API_ENDPOINT}/notes`, {
         method: 'POST',
         body: JSON.stringify(note),
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
         this.context.addNotes(data)
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
      const nameError = this.validateName();
      const contentError = this.validateContent();
      const folderError = this.validateFolder();
      const { folders } = this.context
      const options = folders.map((folder, i) => <option value={folder.name} key={i}>{folder.name}</option>)
      const allowSelection = folders.length === 0
      ? <div className="lds-facebook"><div></div><div></div><div></div></div>
      : <select
         id='folder'
         name='folder'
         className='folder_selection'
         onChange={e => this.changeSelection(e.target.value)}>
            <option value='None'>
               Select one...
            </option>
            {options}
         </select>
      return (
         <>
            <nav></nav>
            <div className='add__notes'>
               <form className='add__notes_form' onSubmit={e => this.handleNoteSubmit(e)}>
                  <h2>Add Note</h2>
                  <label htmlFor='note_name'>Note Name
                     {this.state.name.touched && <ValidationError message={nameError} />} 
                  </label>
                  <input 
                     type='text'
                     name='note_name'
                     id='note_name'
                     onChange={e => this.updateNoteName(e.target.value)}
                  />
                  <label htmlFor='note_content'>Note Content
                     {this.state.name.touched && <ValidationError message={contentError} />}
                  </label>
                  <textarea 
                     type='text'
                     name='note_content'
                     id='note_content'
                     onChange={e => this.updateNoteContent(e.target.value)}
                  />
                  <div className='folder_selection'>
                     <label htmlFor='folder'>Select a Folder:
                        <div>{this.state.name.touched && <ValidationError message={folderError} />}</div>
                     </label>
                     {allowSelection}
                  </div>
                  <div className='registration__button__group'>
                     <button type='reset' className='registration__button' onClick={this.handleClickCancel}>
                        Cancel
                     </button>
                     <button 
                        type='submit' 
                        className='registration__buton'
                        disabled={
                           this.validateName() ||
                           this.validateContent() ||
                           this.validateFolder()
                        }   
                     >
                        Save
                     </button>
                  </div>
               </form>
            </div>
         </>
      );
   }
}

export default AddNote;