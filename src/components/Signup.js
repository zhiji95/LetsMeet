import React, { Component } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { API, Auth } from "aws-amplify";
import "../css/Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
        newUser: null
    };
  }

  validateForm() {
    return (
        this.state.email.length > 0 &&
        this.state.address.length > 0 &&
        this.state.password.length > 0 &&
        this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
  }

  // addUser API call
  addUser = async (data) => {
    return API.post("endpoints", "restaurant-meetup-users", {
        body: {
            userId: data.userId,
            address: data.address
        }
    })
  }

  handleSubmit = async event => {
        event.preventDefault();

        const addUserData = await this.addUser({
            userId: this.state.email,
            address: this.state.address
        })

        console.log('addUser API call: ', addUserData);

        this.setState({ isLoading: true });

        try {
        const newUser = await Auth.signUp({
            username: this.state.email,
            password: this.state.password
        });
        this.setState({
            newUser
        });
        } catch (e) {
        alert(e.message);
        }

        this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/groupControl");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
  }

  renderConfirmationForm() {
    return (
        <form onSubmit={this.handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" bssize="large">
                <FormLabel>Please check your inbox for the confirmation code</FormLabel>
            <FormControl
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
            />
            </FormGroup>
            <LoaderButton
                block
                bssize="large"
                disabled={!this.validateConfirmationForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Verify"
                loadingText="Verifying…"
            />
        </form>
    );
  }

  renderForm() {
    return (
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bssize="large">
                <FormLabel>Email</FormLabel>
            <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="address" bssize="large">
                <FormLabel>Address</FormLabel>
            <FormControl
                autoFocus
                value={this.state.address}
                onChange={this.handleChange}
            />
            </FormGroup>
            <FormGroup controlId="password" bssize="large">
                <FormLabel>Password</FormLabel>
            <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
            />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bssize="large">
                <FormLabel>Confirm Password</FormLabel>
            <FormControl
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
            />
            </FormGroup>
            <LoaderButton
                block
                bssize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Sign up"
                loadingText="Signing up…"
            />
        </form>
    );
  }

  render() {
    return (
        <div className="Signup">
            {this.state.newUser === null
            ? this.renderForm()
            : this.renderConfirmationForm()}
        </div>
    );
  }
}
