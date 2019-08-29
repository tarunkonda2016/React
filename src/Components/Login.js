import React, { Component } from 'react'
import firebase from './Firebase'



let db = firebase.firestore()

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.email = this.email.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            email : ''
        }

    }

    email = (val) => {
        this.setState({email : val.target.value})
    }

    submit = (event) => {
        // db.collection("companyAdmin").where("email" , "==" , this.state.email)
        // .get()
        // .then((querySnapshot) => {

        //     querySnapshot.docs.map(function (documentSnapshot) {
        //         console.log('documentSnapshot',documentSnapshot.data());
                 
        //     });

            

        // })
        // .catch(function (error) {
        //     console.log("Error getting documents: ", error);
        // });

        this.props.history.push('/dashboard');

        event.preventDefault()

    }

    render() {
        return (
            <div class="loginF">

            <div class="container">

                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Admin Login</h2>
                            <p>Please enter your email </p>
                        </div>
                        <form id="Login">

                            <div class="form-group">


                                <input type="email" value={this.state.email} class="form-control" id="inputEmail" placeholder="Email Address" onChange={this.email} />

                            </div>
{/* 
                            <div class="form-group">

                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" />

                            </div> */}
                            {/* <div class="forgot">
                                <a href="reset.html">Forgot password?</a>
                            </div> */}
                            <button type="submit" onClick={this.submit} class="btn btn-primary">Login</button>

                        </form>
                    </div>
                </div>
                </div>
                </div>

        )



    }



}    