import React, { Component } from 'react';
import propTypes from 'prop-types';

class Sentences extends Component{
   static propTypes = {
      sentences: propTypes.string
   }
   render(){
      const { sentences } = this.props
      return(
         <>
            <h3>Content:</h3>
            <p>{`${sentences.slice(0, 150)}...`}</p>
         </>
      )
   }
}

export default Sentences;