import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
  renderSidebarRoutes(){
    const { notes, folders } = this.state;
    return (
        <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact path={path}
                  key={path}
                  render={routeProps => (
                      <SidebarList
                          folders={folders}
                          notes={notes}
                          {...routeProps}
                      />
                  )}
              />
          ))}
          <Route
            path='/note/:noteId'
            render={routeProps => {
              const { noteId } = routeProps.match.params
              const note = notes.find(note => note.id === noteId) 
              const folderData = folders.find(folder => folder.id === note.folderId)
              console.log(folderData)
              return <SidebarPage {...routeProps} folder={folderData} />
            }}
          />
          <Route path="/add-folder" component={SidebarPage} />
          <Route path="/add-note" component={SidebarPage} />
      </>
    );
  }
  renderMainRoutes(){
    const { notes } = this.state
    const getNotesForFolder = (notes=[], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    )
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact path={path}
            key={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return(
                <MainList
                  {...routeProps}
                  notes={notesForFolder}
                  modified={notes.modified}
                />
              )
            }}
          />
        ))}
        <Route 
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = notes.find(note => note.id === noteId)
            return <MainPage {...routeProps} note={note} />
          }}
        />
      </>
    )
  }
  render(){
    const renderSidebarRoutes = this.renderSidebarRoutes()
    const renderMainRoutes = this.renderMainRoutes()
    return (
      <div className='App'>
        {renderSidebarRoutes}
        <Header />
        {renderMainRoutes}
      </div>
    );
  }
}

export default App;