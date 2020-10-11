import React from "react";
import mammoth from 'mammoth';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Card
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


function Home() {

const [ev, changeEv]=React.useState(null); // state to save file import event
const [op, changeOp]=React.useState(""); // state to change output text
const [met, changeMet]=React.useState(null); //state to change file's metadata

const parseWordDocxFile = (inputElement) => { // function which parses the file to raw text. Within it, I have commented out 2 other methods of getting text. As html, and markdown
  if(inputElement === null){return;}
      var files = ev;
      if (!files.length) return;
      var file = files[0];
      console.log(file);
      changeMet(file);
      console.time();
      var reader = new FileReader();
      reader.onloadend = function(event) {
      var arrayBuffer = reader.result;
      mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
      var result1 = resultObject.value
      changeOp(op+result1+"\n\n");

        })

/*
  mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
    var result1 = resultObject.value
    changeOp("");
    changeOp(op+result1+"\n\n");
    console.log(resultObject.value)
  })

  mammoth.convertToMarkdown({arrayBuffer: arrayBuffer}).then(function (resultObject) {
  var result3 = resultObject.value
  changeOp(op+result3+"\n\n");
    console.log(resultObject.value)
  })
  */
       };
      reader.readAsArrayBuffer(file);
  }

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Drop your .docx file below
          </Header>
          <Form size="large" onSubmit={parseWordDocxFile}>
            <Segment stacked>
              <input type="file" accept=".docx" multiple='false' onChange={e => changeEv(e.target.files)}/>
              <Button color="teal" size="large" type="submit">
                Convert
              </Button>
            </Segment>
          </Form>
          <Card style={{width: 450}}>
        <Card.Content>
          <Card.Header>Output</Card.Header>
          <Card.Description>
            {op}
          </Card.Description>
        </Card.Content>
      </Card>
      <Card style={{width: 450}}>
    <Card.Content>
      <Card.Header>File metadata</Card.Header>
      <Card.Description>
        File name: {met!=null && met.name} <br/>
        Size: {met!=null && met.size} <br/>
        Last modified: {met!=null && met.lastModifiedDate.toString()} <br/>
      </Card.Description>
    </Card.Content>
  </Card>
        </Grid.Column>
      </Grid>

    </div>
  );
}

export default Home;
