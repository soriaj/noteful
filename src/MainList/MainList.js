import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from '../Note/Note'
import Sentences from '../Sentences/Sentence';
import './MainList.css'

class Main extends Component{
   static defaultProps = {
      notes: []
   }
   render(){
      // console.log('Main props: ', this.props.notes)
      return(
         <section>
            <ul>
               {this.props.notes.map(note => 
                  <li key={note.id}>
                     <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                     />
                     <Sentences sentences={note.content} />
                  </li>
               )}
            </ul>
            <div className='note_add'>
               <FontAwesomeIcon icon={faPlus} /><NavLink className='nav_notes_button' to='#'> Add Note</NavLink>
            </div>
         </section>
      )
   }
}

export default Main;