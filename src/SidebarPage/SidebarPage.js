import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from "@fortawesome/free-solid-svg-icons";


class SidebarPage extends Component{
   render(){
      // console.log('sidebarpage', this.props)
      const { history, folder } = this.props
      return(
         <div className='.nav_notes_add'>
            {folder && (
               <h3 className='sidebarpage__foldername'>
                  {folder.name}
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