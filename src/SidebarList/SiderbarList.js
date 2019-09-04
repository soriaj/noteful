import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import NotesContext from '../NoteContext';
import './SidebarList.css'

class SidebarList extends Component{
   static contextType = NotesContext;
   render(){
      // console.log('Sidebar props: ', this.props.folders)
      // const { folders } = this.props
      // console.log('SidebarList context: ', this.context)
      const { folders } = this.context
      return(
         <nav role='navigation' className='nav'>
            {folders.map(folder => 
               <div key={folder.id} className='nav_notes_add'>
                  <NavLink to={`/folder/${folder.id}`}>
                     {folder.name}
                  </NavLink>
               </div>
            )}
            <div className='nav_notes_add'>
               <FontAwesomeIcon icon={faFolderPlus} />
                  <NavLink 
                  className='nav_notes_button' 
                  to='/add-folder'
                  // onClick={() => this.context.addFolders()}
                  > Add Folder
                  </NavLink>
            </div>
         </nav>
      )
   }
}

export default SidebarList;