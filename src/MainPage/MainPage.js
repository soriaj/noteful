import React, { Component } from 'react'
import Note from '../Note/Note'
// import './NotePageMain.css'

class MainPage extends Component{
   static defaultProps = {
      note: {
         content: '',
      }
   }
   render(){
      // console.log('MainPage props: ', this.props)
      return(
         <section>
            <Note
               id={this.props.note.id}
               name={this.props.note.name}
               modified={this.props.modified}
            />
            <div>
               {this.props.note.content.split(/\n \r|\n/).map((para, idx) =>
                  <p key={idx}>{para}</p>
               )}
            </div>
         </section>
      )
   }
}

export default MainPage;