import React from 'react';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';
const firebase = require('firebase');

class LoginComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            email: null,
            password: null,
            signInError: ''
        };
    }

    render() {

        const { classes } = this.props;

        return ( 
            <main className={classes.main}>
                <CssBaseLine></CssBaseLine>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Log In!
                    </Typography>
                    <form className={classes.form} onSubmit={ (e) => this.submitLogin(e)}>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="login-email-input">Enter Your Email</InputLabel>
                            <Input autocomplete="email" onChange={(e) => this.userTyping('email', e)} autoFocus id="login-email-input"></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="login-password-input">Enter Your Password</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping('password', e)} autoFocus id="login-password-input"></Input>
                        </FormControl>
                        <Button type="submit" fullWidth color="primary" variant="contained" className={classes.submit}> Login </Button>
                    </form>

                    {
                        this.state.signInError ? 
                        <Typography className={classes.errorText} component="h5" variant="h6">
                            Incorrect Login Information.
                        </Typography> : null
                    }

                    <Typography component="h5" variant="h6" className={classes.noAccountHeader}>Don't Have An Account?'</Typography>
                    <Link className={classes.signUpLink} to="/signup">Sign Up!</Link>
                </Paper>
            </main>
        )
    }

    submitLogin = (e) => {
        e.preventDefault();
        
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/dashboard');
            }, err => {
                this.setState({ signInError: 'Server Error' });
                console.log(err);
            });
    }

    userTyping = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({ email: e.target.value });
                break;

            case 'password':
                this.setState({ password: e.target.value });
                break;

            default:
                break;
        }
    }
}

export default withStyles(styles)(LoginComponent);