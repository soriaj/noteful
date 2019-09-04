import React, { Component } from 'react';
import Note from '../Note/Note';
import './MainPage.css'
import NotesContext from '../NoteContext'

class MainPage extends Component{
   static defaultProps = {
      note: {
         content: '',
      }
   }
   static contextType = NotesContext
   handleDeleteNote = () => {
         this.props.history.push(`/`)
   }
   render(){
      const { notes } = this.context
      const { noteId } = this.props.match.params
      const noteData = notes.find(note => note.id === noteId) || { content: ''}
      return(
         <section className='main_note'>
            <Note
               id={noteData.id}
               name={noteData.name}
               modified={noteData.modified}
               onDeleteNote={this.handleDeleteNote}
            />
            <div>
               {noteData.content.split(/\n \r|\n/).map((para, idx) =>
                  <p key={idx}>{para}</p>
               )}
            </div>
         </section>
      )
   }
}

export default MainPage;