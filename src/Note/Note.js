import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';
import NotesContext from '../NoteContext';
import Config from '../Config'
import './Note.css'

class Note extends Component{
   // static defaultProps = {
   //    onDeleteNote: () => {},
   // }
   static contextType = NotesContext
   handleStuff = () => {
      console.log('you clicked the button')
   }
   handleDelete = event => {
      event.preventDefault()
      const noteId = this.props.id

      fetch(`${Config.API_ENDPOINT}/notes/${noteId}`, {
         method: 'DELETE',
         headers: {
            'content-type': 'application/json'
         },
      })
      .then(res => {
         if(!res.ok)
            return res.json().then(e => Promise.reject(e))
         return res.json()
      })
      .then(() => {
         this.context.deleteNotes(noteId)
         this.props.onDeleteNote(noteId)
      })
      .catch(error => {
         console.log({error})
      })
   }
   render(){
      // console.log('Note props:', this.props)
      console.log('Notes context: ', this.context)
      return(
         <>
            <h2 className='note_name'>
               <Link to={`/note/${this.props.id}`}>
                  {this.props.name}
               </Link>
            </h2>
            <button 
               className='Note__delete' 
               type='button'
               onClick={() => this.handleStuff}>
               <FontAwesomeIcon icon={faTrashAlt} />
               {' '}
               Remove
            </button>
            <div>
               <div>
                  Modified
                  {' '}
                  <span>
                     <Moment format="MM/DD/YY">
                        {this.props.modified}
                     </Moment>
                  </span>
               </div>
            </div>
            <div>
               <p>{}</p>
            </div>
         </>  
      )
   }
}

export default Note;