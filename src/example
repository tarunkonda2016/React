import React, { Component } from "react";
import logo from "./logo.svg";
import firebase from 'firebase/app';
import "./App.css";
import {
  BootstrapTable,
  TableHeaderColumn,
  InsertModalFooter
} from "react-bootstrap-table";
import Files from 'react-files'
import excel from 'xlsx';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';






class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file : '',
      rows: [],
      cols : [],
      list: [
        {
          id: 1,
          name: "Item name 1",
          price: 100,
          data : '123',
          age : 1,
          active : false,
          isTrue : false
        },
        {
          id: 2,
          name: "Item name 1",
          price: 100,
          data : '123',
          age : 1,
          active : false,
          isTrue : false
        },
        {
          id: 1,
          name: "Item name 1",
          price: 100,
          data : '123',
          age : 1,
          active : false,
          isTrue : false
        },
        {
          id: 2,
          name: "Item name 1",
          price: 100,
          data : '123',
          age : 1,
          active : false,
          isTrue : false
        },
        {
          id: 1,
          name: "Item name 1",
          price: 100,
          data : '123',
          age : 1,
          active : false,
          isTrue : false
        },
        {
          id: 2,
          name: "Item name 1",
          price: 100,
          data : '123',
          age : 1,
          active : false,
          isTrue : false
        },
        
      ],
      excelList : []
    };
  }


  onFilesChange = (files) => {
    console.log('header');
    
    this.setState({file : files[0].preview.url})
  }
 
  onFilesError =  (error, file) => {
    console.log('error code ' + error.code + ': ' + error.message)
  }


  componentDidMount() {

 



    //spreadsheet (2).csv

    // let fileName = "C:\Users\prunta30z\Downloads\spreadsheet (2).csv";
    // let workbook = excel.readFile(fileName);
    // console.log(workbook) //should print an array with the excel file data


    // const config = {
    //   apiKey: 'AIzaSyDV0pBNiDAf2DVagomi_M4Zo7uLh-SAcYg  ',
    //   authDomain: 'AIzaSyDV0pBNiDAf2DVagomi_M4Zo7uLh-SAcYg.firebaseapp.com',
    //   databaseURL: 'https://think-piece.firebaseio.com',
    //   projectId: 'fir-a39b7',
    //   storageBucket: 'fir-a39b7.appspot.com',
    // };
    
    // firebase.initializeApp(config);


    
    

    
    // var file = "";

    // // Create the file metadata
    // var metadata = {
    //   contentType: "image/jpeg"
    // };

    // // Upload file and metadata to the object 'images/mountains.jpg'
    // var uploadTask = storageRef
    //   .child("images/" + file.name)
    //   .put(file, metadata);

    // // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on(
    //   firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    //   function(snapshot) {
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case firebase.storage.TaskState.PAUSED: // or 'paused'
    //         console.log("Upload is paused");
    //         break;
    //       case firebase.storage.TaskState.RUNNING: // or 'running'
    //         console.log("Upload is running");
    //         break;
    //     }
    //   },
    //   function(error) {
    //     // A full list of error codes is available at
    //     // https://firebase.google.com/docs/storage/web/handle-errors
    //     switch (error.code) {
    //       case "storage/unauthorized":
    //         // User doesn't have permission to access the object
    //         break;

    //       case "storage/canceled":
    //         // User canceled the upload
    //         break;

    //       case "storage/unknown":
    //         // Unknown error occurred, inspect error.serverResponse
    //         break;
    //     }
    //   },
    //   function() {
    //     // Upload completed successfully, now we can get the download URL
    //     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    //       console.log("File available at", downloadURL);
    //     });
    //   }
    // );
  }

 
  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        let array = undefined
        console.log('success',resp);            
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        },() => {
      

          

          this.state.rows.forEach(element => {
            if(array === undefined){
              array = element
              console.log('array',array);
              return
            }
            let obj = Object.assign({}, ...array.map((n, index) => ({[n]: element[index]})))
            this.state.excelList.push(obj)            

            //console.log('ele',element);
            
            
          });

          this.setState({file : ''})

         // console.log('finalList',this.state.excelList);
          

          
        })};
          
    

      
    });               

  }


  render() {

    return (
      <div class="container">

<input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />


{/* <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> */}


        <BootstrapTable
          deleteRow={true}
          bordered={true}
          pagination={true}
          data={this.state.excelList}
          striped={true}
          hover={true}
          insertRow={true}
          exportCSV={true}
          search={true}
        >
          <TableHeaderColumn
            dataField="id"
            isKey={true}
            dataAlign="center"
            search
          >
            Product ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="age">Age</TableHeaderColumn>
          <TableHeaderColumn dataField="active">Active</TableHeaderColumn>
          <TableHeaderColumn dataField="isTrue">isTrue</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default App;
