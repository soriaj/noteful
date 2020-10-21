import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from '../Note/Note';
import NoteError from '../NoteError/NoteError';
import Sentences from '../Sentences/Sentence';
import NotesContext from '../NoteContext';
import './MainList.css'

class Main extends Component{
   static defaultProps = {
      notes: []
   }
   static contextType = NotesContext;
   handleDeleteNote = () => {
      this.props.history.push(`/`)
   }
   render(){
      const { notes } = this.context
      const { folderId } = this.props.match.params
      const getNotesForFolder = (notes, folderId) => (
         (!folderId)
           ? notes
           : notes.filter(note => note.folder_id === folderId)
       )
      return(
         <NoteError>
         <section>
            <ul>
               {getNotesForFolder(notes, folderId).map(note => 
                  <li key={note.id} className='note_item'>
                     <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        onDeleteNote={this.handleDeleteNote}
                     />
                     <Sentences sentences={note.content} />
                  </li>
               )}
            </ul>
            <div className='note_add'>
               <FontAwesomeIcon icon={faPlus} />
               <NavLink className='nav_notes_button' to='/add-note'> 
                  Add Note
               </NavLink>
            </div>
         </section>
         </NoteError>
      )
   }
}

export default Main;