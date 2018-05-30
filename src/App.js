import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {fullName: '', email: '', message: '', responseMessage: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        // Build the data to send to the Amazon gateway API.
        const data = {name: this.state.fullName, email: this.state.email, subject: "MK Developer Challenge", message: this.state.message};
        const headers = {'Content-Type': 'application/json'};
        fetch("https://len332mac1.execute-api.us-east-1.amazonaws.com/Testing/emails", {method: "post", body: JSON.stringify(data), headers: headers}).then(function (response) {
            if(response.ok){
                // Only clear inputs if the response was ok.
                this.setState({fullName: '', email: '', message: '', responseMessage: 'Successfully sent email. Thank you!'});
            }
            else{
                this.setState({responseMessage: 'Error occurred while processing your request. Please try again later.'});
            }

        }.bind(this)).catch( function (err) {
            this.setState({responseMessage: 'Error occurred while processing your request. Please try again later.'});
        });

    }

    // Update state when a change is detected.
    handleChange(event){
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

  render() {
    return (
      <div className="App">
          <AppBar position="static" color="primary">
              <Toolbar>
                  <Typography variant="title" color="inherit">
                      MK Developer Challenge
                  </Typography>
              </Toolbar>
          </AppBar>
          <div className="Container">
        <form onSubmit={this.handleSubmit}  method="post">
        <TextField id="fullName" name="fullName" label="Name" placeholder="Full Name" autoComplete="name" fullWidth margin="normal" required value={this.state.fullName}  onChange={this.handleChange}/>
          <TextField id="email" name="email" label="Email" placeholder="Email Address" autoComplete="email" fullWidth type="email" margin="normal" required value={this.state.email}  onChange={this.handleChange}/>
          <TextField id="message" name="message" label="Message" multiline rows="6" fullWidth placeholder="Enter your message." margin="normal" required value={this.state.message} onChange={this.handleChange}/>
          <Button variant="raised" color="primary" fullWidth type="submit">Submit</Button>
        </form>
          <Typography variant="headline" margin="normal">{this.state.responseMessage}</Typography>
          </div>
      </div>
    );
  }
}

export default App;
