import React, { Component } from 'react'
import firebase from './Firebase'
import { BootstrapTable, TableHeaderColumn, InsertModalFooter, InsertButton } from 'react-bootstrap-table';
import QRCode from 'qrcode.react'

const pd = ['Price', 'Subcidy', 'Free'];


let db = firebase.firestore()

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.onAddRow = this.onAddRow.bind(this)
        this.createCustomModalFooter = this.createCustomModalFooter.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.insertEmployee = this.insertEmployee.bind(this)
        this.importExcel = this.importExcel.bind(this)
        this.downloadQR = this.downloadQR.bind(this)

        this.state = {
            dummy: '',
            qrcodeValue : '',
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

    createCustomModalFooter = () => {

    }

    handleModalClose = () => {

    }


    handleSave = () => {

    }


    componentWillMount() {
        db.collection("users")
            .get()
            .then((querySnapshot) => {

                let data = querySnapshot.docs.map(function (documentSnapshot) {
                    return documentSnapshot.data();
                });

                this.setState({ empList: data })


            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }

    importExcel = () => {
        
        this.props.history.push('/importExcel');

    }

    downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = this.state.qrcodeValue + ".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);



    }

    onAddRow = (row) => {
        if (row.depratment !== "" && row.designation !== "" && row.emp_id !== "" && row.emp_mobile !== "" &&
            row.emp_name !== "" && row.pd !== "") {
            this.insertEmployee(row)
        } else {
            alert('Please Fill All The Fields')
        }

    }

    insertEmployee = (row) => {
        this.setState({qrcodeValue : row.emp_id},() => {
            this.downloadQR()
            db.collection("users").add({
                'emp_id': row.emp_id,
                'emp_name': row.emp_name,
                'depratment': row.depratment,
                'designation': row.designation,
                'pd': row.pd,
                'emp_mobile': row.emp_mobile,
                'is_active': true
            })
                .then((docRef) => {
                    this.state.empList.push({
                        'emp_id': row.emp_id,
                        'emp_name': row.emp_name,
                        'depratment': row.depratment,
                        'designation': row.designation,
                        'pd': row.pd,
                        'emp_mobile': row.emp_mobile,
                        'is_active': true
                    })
                    this.setState({ qrcodeValue : '' })
                })
                .catch((error) => {
                    alert('error')
                    console.error("Error adding document: ", error);
                });
        })
        
    }



    render() {
        const options = {
            onAddRow: (row) => this.onAddRow(row),
            paginationSize: 20,
            paginationShowsTotal: true,
            searchDelayTime: 500,
            sizePerPage: 20,
        }

        const qrOptions = {
            size: 128,
            fgColor: '#000000',
            bgColor: '#ffffff',
            level: 'H',
            renderAs: 'canvas',
        }

        return (

            <div id="wrapper">

                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div class="sidebar-brand-icon rotate-n-15">
                            <i class="fas fa-laugh-wink"></i>
                        </div>
                        <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                    </a>

                    <hr class="sidebar-divider my-0"></hr>

                    <li class="nav-item">
                        <a class="nav-link" href="index.html">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span></a>
                    </li>

                    <hr class="sidebar-divider" />

                    <div class="sidebar-heading">
                        Interface
</div>

                    <li class="nav-item">
                        <a class="nav-link" href="charts.html">
                            <i class="fas fa-fw fa-chart-area"></i>
                            <span>Companys Details</span></a>
                    </li>

                    <li class="nav-item active">
                        <a class="nav-link" href="tables.html">
                            <i class="fas fa-fw fa-table"></i>
                            <span>Employee Details</span></a>
                    </li>

                    <hr class="sidebar-divider d-none d-md-block"></hr>

                    <div class="text-center d-none d-md-inline">
                        <button ref={a => this.button = a} class="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>


                </ul>

                <div id="content-wrapper" class="d-flex flex-column">

                    <div id="content">


                        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                            <ul class="navbar-nav ml-auto">

                               

                            </ul>

                        </nav>


                        <div class="container-fluid">
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary float-left">Employee Details</h6>
                                    <div onClick={this.importExcel} class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm float-right"><i  class="fas fa-plus fa-sm text-white-50"></i> import from excel</div>
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


                    </div>

                {this.state.qrcodeValue !== '' && <div className="container">
                    <QRCode
                    id={'123456'}
                    value={this.state.qrcodeValue}
                    size={qrOptions.size}
                    fgColor={qrOptions.fgColor}
                    bgColor={qrOptions.bgColor}
                    level={qrOptions.level}
                    renderAs={qrOptions.renderAs}
                    includeMargin={true}
                    />
                </div>}


                </div>

            </div>
        )
    }

}