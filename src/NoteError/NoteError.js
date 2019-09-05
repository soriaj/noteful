import React, { Component } from 'react';
import propTypes from 'prop-types';
import './NoteError.css';

class NoteError extends Component {
   constructor(props) {
      super(props);
      this.state = {
         hasError: false
      }
   }
   static propTypes = {
      hasError: propTypes.bool
   }
   static getDerivedStateFromError(error){
      return { hasError: true };
   }   
   render() {
      if(this.state.hasError){
         return(
            <h2 className='error_boundary'>Could not display notes.</h2>
         );
      }
      return this.props.children
   }
}

export default NoteError;