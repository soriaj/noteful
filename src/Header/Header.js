import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import './Header.css'


class Header extends Component{
   render(){
      return(
         <header role='banner' className='header'>
            <h1><span><FontAwesomeIcon icon={faStickyNote} /></span><NavLink to='/'>{' '}Noteful</NavLink></h1>
         </header>
      )
   }
}

export default Header;