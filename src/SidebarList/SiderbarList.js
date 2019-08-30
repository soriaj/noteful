import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './SidebarList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

class SidebarList extends Component{
   static defaultProps = {
      folders: []
   }
   render(){
      // console.log('Sidebar props: ', this.props.folders)
      const { folders } = this.props
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
               <FontAwesomeIcon icon={faFolderPlus} /><NavLink className='nav_notes_button' to='#'> Add Folder</NavLink>
            </div>
         </nav>
      )
   }
}

export default SidebarList;