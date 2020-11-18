import React from "react";
import logo from '../statics/img/logo.png'
import { signout } from "../store/actions/auth";
import { useHistory } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Menu, Divider
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Documentation = () => {
 const history = useHistory();
  return (
    <div>
      <div>
    <Menu style={{
     backgroundColor: '#0E6EB8', color: 'white'}}>
            <Menu.Item
              name='editorials'
              style={{
               color: 'white'}}
              //active={activeItem === 'editorials'}
            //  onClick={this.handleItemClick}
            >
              <img src={logo} className="ui mini image" style={{ marginRight: '1.5em' }} alt="logo"/> ExData
            </Menu.Item>

            <Menu.Item
              name='reviews'
              style={{
               color: 'white'}}
                onClick={() =>{history.push("/")}}
            //  active={activeItem === 'reviews'}
            //  onClick={this.handleItemClick}
            >
              Home
            </Menu.Item>

            <Menu.Item
              name='upcomingEvents'
              style={{
               color: 'white'}}
               onClick={() =>{history.push("/documentation")} }
            //  active={activeItem === 'upcomingEvents'}
            //  onClick={this.handleItemClick}
            >
                Documentation
            </Menu.Item>
            <Menu.Item
            style={{
             color: 'white'}}
             onClick={() => signout()}>

              Log out

            </Menu.Item>
          </Menu>

</div>
      <div>
<br/><br/>
      <Container text fluid>
    <Header as='h2'>Instructions</Header>
    <Divider/>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
      dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
      viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
      Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
      dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
      viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
      Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
    </p>
  </Container>
  </div>
      </div>




  );
};


export default Documentation;
