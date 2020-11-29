import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import requireAuth from "./hoc/requireAuth";
import logo from '../statics/img/logo.png'
import { signout } from "../store/actions/auth";
import { useHistory } from "react-router-dom";
import { Container } from 'semantic-ui-react'
import templatedoc from './templatedoc.docx';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Menu, Divider
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import image1 from "./exss/2.png";
import image2 from "./exss/3.png";
import image3 from "./exss/4.png";
import image4 from "./exss/5.png";
import image5 from "./exss/6.png";
import image6 from "./exss/7.png";
const Documentation = ({signout}) => {
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
                Instructions
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
    <Header as='h3'>Template</Header>
    <Divider/>
  Click <a href={templatedoc} download>here</a> to download the template document. Make sure any uploaded report follows this format.<br/><br/>
</p>
<p>
<Header as='h3'>Steps</Header>
<Divider/>
<Header as='h4'>Step 1</Header>
Download the template from the download link above and use it for any and all reports you would like to have converted to an excel workbook.
<Header as='h4'>Step 2</Header>
Once you logged in, you will be presented with the converter.<br/>
<img src={image1}  style={{ width:'90%'}} />
<Header as='h4'>Step 3</Header>
Click on "Choose files" and a file explorer will open where you will be able to select your report documents.<br/>
<img src={image2}  style={{ width:'90%'}} />
<Header as='h4'>Step 4</Header>
After you have selected all your files and clicked "Open" on the file explorer, the converter will be ready to convert the documents into an Excel workbook. Click on "Convert"<br/>
<img src={image3}  style={{ width:'90%'}} />
<Header as='h4'>Step 5</Header>
After a few seconds, the Excel workbook will be available to be downloaded. You can either click on download, or if you feel that you have made a mistake, you can click on try again.<br/>
<img src={image4}  style={{ width:'90%'}} />
<Header as='h4'>Step 6</Header>
The downloaded file will now be available on your computer to be opened and edited, if necessary.<br/>
<img src={image5}  style={{ width:'90%'}} /><br/><br/>
</p>
<Header as='h3'>FYI</Header>
<Divider/>
<br/>
Each of your Word document will be split into seperate sheets in the same workbook you just downloaded..<br/>
<img src={image6}  style={{ width:'90%'}} /><br/><br/>
  </Container>
  </div>
      </div>




  );
};
function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout())
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  requireAuth
)(Documentation);
