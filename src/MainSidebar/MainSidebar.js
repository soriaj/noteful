import React, { Component } from 'react'

class MainSidebar extends Component{
   render(){
      console.log('mainSidebar Props: ', this.props)
      return(
         <div>
            <h1>Main Side Bar</h1>
         </div>
      )
   }
}

export default MainSidebar;