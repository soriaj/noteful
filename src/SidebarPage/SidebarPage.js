import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import NotesContext from '../NoteContext'


class SidebarPage extends Component{
   static contextType = NotesContext
   render(){
      const { history } = this.props
      const { noteId } = this.props.match.params
      const { notes, folders } = this.context
      const note = notes.find(note => note.id === noteId) 
      const folderData = folders.find(folder => folder.id === note.folder_id)
      return(
         <div className='.nav_notes_add'>
            {folderData && (
               <h3 className='sidebarpage__foldername'>
                  {folderData.name}
               </h3>
            )}
            <button
               className='sidebarpage_back'
               type='button' onClick={() => history.goBack()}
            ><FontAwesomeIcon icon={faUndo} /> Back</button>
         </div>
      )
   }
}

export default SidebarPage;