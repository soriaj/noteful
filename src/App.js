import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SidebarList from './SidebarList/SiderbarList';
import SidebarPage from './SidebarPage/SidebarPage';
import Header from './Header/Header'
import MainList from './MainList/MainList';
import MainPage from './MainPage/MainPage'
import NOTES from './NOTES'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    }
  }
  componentDidMount(){
    setTimeout(() => this.setState(NOTES), 100)
  }
  render(){
    const { notes, folders } = this.state;
    const getNotesForFolder = (notes=[], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    )
    return (
      <Router>
        <div className='App'>
          <Header />
          <Switch>
            <Route exact path='/'
              render={routeProps => {
                const { folderId } = routeProps.match.params
                const notesForFolder = getNotesForFolder(notes, folderId)
                return(
                  <>
                  <SidebarList
                    folders={folders}
                    notes={notes}
                    {...routeProps}
                  />
                    <MainList
                      {...routeProps}
                      notes={notesForFolder}
                      modified={notes.modified}
                    />
                  </>
                )
              }}
            />
            <Route path='/folder/:folderId' 
              render={routeProps => {
                const { folderId } = routeProps.match.params
                const notesForFolder = getNotesForFolder(notes, folderId)
                return(
                  <>
                    <SidebarList
                      folders={folders}
                      notes={notes}
                      {...routeProps}
                    />
                    <MainList
                      {...routeProps}
                      notes={notesForFolder}
                      modified={notes.modified}
                    />
                  </>
                )
              }}
            />
            <Route
              path='/note/:noteId'
              render={routeProps => {
                const { noteId } = routeProps.match.params
                const note = notes.find(note => note.id === noteId) 
                const folderData = folders.find(folder => folder.id === note.folderId)
                return(
                  <>
                    <SidebarPage {...routeProps} folder={folderData} />
                    <MainPage {...routeProps} note={note} />
                  </>
                )
              }}
            />
          </Switch>
        </div>
      </Router> 
    );
  }
}

export default App;