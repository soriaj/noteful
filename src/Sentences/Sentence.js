import React, { Component } from 'react';

class Sentences extends Component{
   render(){
      // console.log('Sentences: ', this.props)
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