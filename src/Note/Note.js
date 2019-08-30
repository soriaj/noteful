import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';
import './Note.css'

class Note extends Component{
   render(){
      // console.log('Note props:', this.props)
      
      return(
         <>
            <h2 className='note_name'>
               <Link to={`/note/${this.props.id}`}>
                  {this.props.name}
               </Link>
            </h2>
            <button className='Note__delete' type='button'>
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