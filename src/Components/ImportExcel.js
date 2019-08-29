import React, { Component } from 'react'
import firebase from './Firebase'
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn, InsertModalFooter, InsertButton } from 'react-bootstrap-table';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

const pd = ['Price', 'Subcidy', 'Free'];


let db = firebase.firestore()

export default class ImportExcel extends Component {

    constructor(props) {
        super(props)
        this.fileHandler = this.fileHandler.bind(this)
        this.state = {
            dummy: '',
            empList: [
                {
                    'emp_id': 'XXXX',
                    'emp_name': 'XXXXXXXX',
                    'depratment': 'XXXX',
                    'designation': 'XXXX',
                    'pd': 'XXXX',
                    'emp_mobile': 'XXXX'

                }
            ]
        }


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
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        },() => {
      

          

          this.state.rows.forEach(element => {
            if(array === undefined){
              array = element
              return
            }
            let obj = Object.assign({}, ...array.map((n, index) => ({[n]: element[index]})))
            this.state.empList.push(obj)            
  
          });

          this.setState({dummy : ''})
                    
        })};
          
    

      
    });               

  }



    render(){
        const options = {
            onAddRow: (row) => this.onAddRow(row),
            paginationSize: 20,
            paginationShowsTotal: true,
            searchDelayTime: 500,
            sizePerPage: 20,
        }

        return(
          

            <div class="container-fluid">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary float-left">Employee Details</h6>
                    <div class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm float-right">
                    <input type="file" onChange={this.fileHandler} style={{"padding":"10px"}} />
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">

                        <BootstrapTable data={this.state.empList} options={options} exportCSV={true} insertRow={true} search={true} striped={true} bordered={true} hover={true} pagination={true}>
                            <TableHeaderColumn width={'15%'} dataField="emp_id" isKey={true}  >Employee ID</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataField="emp_name" >Employee Name</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataField="depratment" >Department</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataField="designation" >Designation</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataField="pd" editable={{ type: 'select', options: { values: pd } }}>Payment Details</TableHeaderColumn>
                            <TableHeaderColumn width={'15%'} dataField="emp_mobile" >Mobile Number</TableHeaderColumn>
                        </BootstrapTable>



                    </div>
                </div>
            </div>

        </div>
        )
    }


}    