import React, { Component } from 'react';
import {Route, Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import './Folders.css'

class Folders extends Component {
   render(){
      console.log(this.props)
      return (
         <div className='nav_notes_list'>
            <ul className='NoteListNav__list'>
               {props.folders.map(folder =>
               <li key={folder.id}>
                  <NavLink
                     className='nav_note_item'
                     to={`/folder/${folder.id}`}
                  >
                     <span className='NoteListNav__num-notes'>
                     {countNotesForFolder(props.notes, folder.id)}
                     </span>
                     {folder.name}
                  </NavLink>
               </li>
               )}
            </ul>
            <div className='NoteListNav__button-wrapper'>
               <CircleButton
               tag={Link}
               to='/add-folder'
               type='button'
               className='NoteListNav__add-folder-button'
               >
               <FontAwesomeIcon icon='plus' />
               <br />
               Folder
               </CircleButton>
            </div>
         </div>
         )
      }
      // return(
      //    <>
      //       <div className='nav_notes_list'>
      //          <ul>
      //             {this.props.folders.map(folder => 
      //                <li key={folder.id}>
      //                   <NavLink
      //                      className='nav_note_item'
      //                      to={`/folder/${folder.id}`}
      //                   >
      //                   {/* <span>
      //                      <FontAwesomeIcon icon={faFolderOpen} />
      //                   </span> */}
      //                   {folder.name}
      //                   </NavLink>
      //                </li>
      //             )}
      //          </ul>
      //       </div>
      //    </>
      // )
   }
}

export default Folders;