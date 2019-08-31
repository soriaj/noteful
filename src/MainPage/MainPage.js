import React, { Component } from 'react';
import Note from '../Note/Note';
// import './NotePageMain.css'
import NotesContext from '../NoteContext'
// import Config from '../Config';

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
         <section>
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