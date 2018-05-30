import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();

        const data = {name: this.state.fullName, email: this.state.email, subject: "MK Developer Challenge", message: this.state.message, 'Content-Type': 'application/json'};
        fetch("https://len332mac1.execute-api.us-east-1.amazonaws.com/Testing/emails", {method: "post", body: JSON.stringify(data)}).then(function (response) {
            console.log("successfully sent the email");
        }).catch( function (err) {
            console.log("Whoops! Something happened.")
        });

    }

    handleChange(event){
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}  method="post">
        <TextField id="fullName" name="fullName" label="Name" placeholder="Full Name" fullWidth margin="normal" required  onChange={this.handleChange}/>
          <TextField id="email" name="email" label="Email" placeholder="Email Address" fullWidth type="email" margin="normal" required  onChange={this.handleChange}/>
          <TextField id="message" name="message" label="Message" multiline rows="6" fullWidth placeholder="Enter your message." margin="normal" required onChange={this.handleChange}/>
          <Button variant="raised" color="primary" fullWidth type="submit">Submit</Button>
            <Typography>{this.state.responseMessage}</Typography>
        </form>
      </div>
    );
  }
}

export default App;
