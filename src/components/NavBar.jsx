import React from 'react';
import logo from '../statics/img/logo.png'

const NavBar = () => (
    <div className="ui inverted top fixed menu" style={{
        backgroundColor: '#0E6EB8',
      }} >
   <div className="ui container">
      <a className="header item">
      <img src={logo} className="ui mini image" style={{ marginRight: '1.5em' }} alt="logo"/> ExData</a>
      <a class="item">Home</a>
   </div>
</div>
);

export default NavBar;