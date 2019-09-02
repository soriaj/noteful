import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SidebarList from './SidebarList/SiderbarList';
import SidebarPage from './SidebarPage/SidebarPage';
import Header from './Header/Header'
import MainList from './MainList/MainList';
import MainPage from './MainPage/MainPage';
import NotesContext from './NoteContext';
import AddFolder from './AddFolder/AddFolder';
// import NOTES from './NOTES'
import Config from './Config';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    }
  }
  // componentDidMount(){
  //   Promise.all([
  //       fetch(`${Config.API_ENDPOINT}/folders`),
  //       fetch(`${Config.API_ENDPOINT}/notes`)
  //     ])
  //     .then(([folderRes, notesRes]) => {
  //       if(!folderRes.ok)
  //         return folderRes.json().then(e => Promise.reject(e));
  //       if(!notesRes.ok)
  //         return notesRes.json().then(e => Promise.reject(e));

  //       return Promise.all([folderRes.json(), notesRes.json()]);
  //     })
  //     .then(([folders, notes]) => {
  //       this.setState({folders, notes});
  //     })
  //     .catch(error => {
  //       console.log({error})
  //     })
  // }
  componentDidMount(){
    Promise.all([
      fetch(`${Config.API_ENDPOINT}/folders`).then(res => {
        if(!res.ok)
          throw new Error('Something went wrong in folders')
        return res.json()
      }),
      fetch(`${Config.API_ENDPOINT}/notes`).then(res => {
        if(!res.ok)
          throw new Error('Something went wrong in notes')
        return res.json()
      })
    ])
    .then(([folders, notes]) => {
      this.setState({folders, notes})
    })
    .catch(err => {
      console.error(err)
    })
  }
  // componentWillUnmount(){
  //   clearTimeout(this.timeout)
  // }
  deleteNotes = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    console.log(`You just deleted ${noteId}`)
    setTimeout(() => {
      this.setState({
        notes: newNotes
      })
    }, 200)
  }
  addFolders = folder => {
    this.setState({ folders: [...this.state.folders, folder] })
  }
  renderSidebarRoutes(){
    // const { notes, folders } = this.state;
    return (
        <>
          {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact path={path}
                  key={path}
                  component={SidebarList}
              />
          ))}
          <Route
            path='/note/:noteId'
            component={SidebarPage}
          />
          <Route path="/add-folder" component={AddFolder} />
          <Route path="/add-note" component={SidebarPage} />
      </>
    );
  }
  renderMainRoutes(){
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact path={path}
            key={path}
            component={MainList}
          />
        ))}
        <Route 
          path='/note/:noteId'
          component={MainPage}
        />
      </>
    )
  }
  render(){
    const renderSidebarRoutes = this.renderSidebarRoutes()
    const renderMainRoutes = this.renderMainRoutes()
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNotes: this.deleteNotes,
      addFolders: this.addFolders,
    }
    return (
      <Router>
        <NotesContext.Provider value={contextValue}>
          <div className='App'>
            <Header />
            {renderSidebarRoutes}
            {renderMainRoutes}
          </div>
        </NotesContext.Provider>
      </Router>
    );
  }
}

export default App;
          