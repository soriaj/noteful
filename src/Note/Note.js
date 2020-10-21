import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';
import NotesContext from '../NoteContext';
import Config from '../Config'
import propTypes from 'prop-types';
import './Note.css'

class Note extends Component{
   static propTypes = {
      notes: propTypes.arrayOf(propTypes.shape({
         id: propTypes.string.isRequired,
         name: propTypes.string.isRequired,
         modified: propTypes.string.isRequired
      })),
      onDeleteNote: propTypes.func
   }  
   static contextType = NotesContext
   handleDelete = (event) => {
      event.preventDefault()
      const noteId = this.props.id

      fetch(`${Config.API_ENDPOINT}/notes/${noteId}`, {
         method: 'DELETE',
         headers: {
            'content-type': 'application/json'
         },
      })
      .then(res => {
         if(!res.ok) {
            return res.json().then(e => Promise.reject(e))   
         }
      })
      .then(() => {
         this.context.deleteNotes(noteId)
         this.props.onDeleteNote()
      })
      .catch(error => {
         console.log({error})
      })
   }
   viewNote(path){
      this.props.history.push(path);
   }
   render(){
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
               onClick={(e) => this.handleDelete(e)}
            >
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
         </>  
      )
   }
}

export default Note;