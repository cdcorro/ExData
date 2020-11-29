import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { signout } from "../store/actions/auth";
import requireAuth from "./hoc/requireAuth";
import mammoth from 'mammoth';
import parse from 'html-react-parser';
import TableToExcel from "@linways/table-to-excel";
import logo from '../statics/img/logo.png'
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Card, Menu, Dimmer, Loader, Divider, Icon
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Main = ({ signout }) => {
  const [ready, changeReady]=React.useState(false);
  const [ev, changeEv]=React.useState(null); // state to save file import event
//  const [op, changeOp]=React.useState(""); // state to change output text
  const [met, changeMet]=React.useState(null); //state to change file's metadata
  const [res,changeRes]=React.useState([]);
  const [convclick, changeconv]=React.useState(false);
  const [done1, isDone]=React.useState(false);
  const [name, changeName]=React.useState([]);
  var options = {
     styleMap: [
         "p[style-name='Header'] => p:fresh",
         "p[style-name='Footer'] => p:fresh"
     ]
 };
 const saver = () => {
   //console.log("final length: "+res.length);
   var book=null;
for(var c=0;c<res.length;c++){
   var table1 = document.getElementById(res[c]);

  if(c===0){
  book = TableToExcel.tableToBook(table1, {sheet:{name:"sheet1"}});
  }
  else{
    TableToExcel.tableToSheet(book, table1, {sheet:{name:"sheet".concat((c+1).toString())}});
  }
}

 TableToExcel.save(book, "Output.xlsx")

 }
 const mammothcall= (fileElement) =>{

   var reader = new FileReader();
   reader.readAsArrayBuffer(fileElement);
   reader.onloadend = function(event) {
   var arrayBuffer = reader.result;
     mammoth.convertToHtml({arrayBuffer: arrayBuffer}, options).then(function (resultObject) {
       var result1 = resultObject.value
       //console.log(result1);
       changeRes(oldres => [...oldres, result1]); //problem
       //console.log("current length= "+res.length);
     });
 }

};

  const parseWordDocxFile = (inputElement) => { // function which parses the file to raw text. Within it, I have commented out 2 other methods of getting text. As html, and markdown
  if(inputElement === null){return;}
      var files = ev;
      if (!files.length) return;
      //console.log(files.length);
      var i;
      for(var c=0; c<files.length;c++)
      {
        var temp="table".concat(c.toString());
        changeName(oldName => [...oldName,temp]);

      }
for (i = 0; i < files.length; i++) {
      var file = files[i];
      //console.log(file);
      changeMet(file);
      mammothcall(file);

       }

    changeMet(null);
isDone(true);
    //  console.log(res.length);
  };


 const history = useHistory();

  return (
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
          <Dimmer active={!done1 && convclick} inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Drop your .docx files below
          </Header>
          <Form size="large" onSubmit={parseWordDocxFile}>
            <Segment stacked>
              <input type="file" accept=".docx" multiple onChange={e => {changeEv(e.target.files); changeReady(true);}} disabled={done1}/>
              <Button color="blue" size="large" type="submit" onClick={()=> {
                changeconv(true);

              }} disabled={done1 || !ready}>
                Convert
              </Button>
            </Segment>
          </Form>
<br/>
<Divider/>
{res.length>0 && done1 &&
  <div>
  <a>Please wait for the dowload icon to become visible before downloading</a> <br/> <br/>
  <Button.Group>
  <Button className="btn-switch" color="green" onClick={() => saver()}>
  <Icon name='download' size='large' />
    Save as xlsx
  </Button>
   <Button.Or />
  <Button className="btn-switch" color="blue" onClick={() =>{window.location.reload(false);}}>
    Try again
  </Button>
  </Button.Group>
  </div>
}


      {res.map(i => (
        <table id={i} hidden='true'>
        {res.length>0 && parse(i.toString())}
        </table>
      ))}



        </Grid.Column>
      </Grid>

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
)(Main);
