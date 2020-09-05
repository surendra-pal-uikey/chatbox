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

class SignUpComponent extends React.Component{

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signUpErr: ''
        };
    }
    render() {

        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseLine></CssBaseLine>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign Up!
                    </Typography>
                    <form onSubmit={(e) => this.submitSignup(e)} className={classes.form}>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-email-input">Enter Your Email</InputLabel>
                            <Input autocomplete="email" onChange={(e) => this.userTyping('email', e)} autoFocus id="signup-email-input"></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-passowrd-input">Create A Password</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping('password', e)} autoFocus id="signup-passowrd-input"></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-passowrd-confirmation-input">Confirm Your Password</InputLabel>
                            <Input type="password" onChange={(e) => this.userTyping('passwordConfirmation', e)} autoFocus id="signup-passowrd-confirmation-input"></Input>
                        </FormControl>
                        <Button type="submit" fullWidth color="primary" variant="contained" className={classes.submit}> Submit </Button>
                    </form>
                    {
                        this.state.signUpErr ? 
                        <Typography className={classes.errorText} component="h5" variant="h6">
                            {this.state.signUpErr}
                        </Typography> : null
                    }
                    <Typography component="h5" variant="h6" className={classes.hasAccountHeader}>Already Have An Account?</Typography>
                    <Link className={classes.logInLink} to="/login">Sign In!</Link>
                </Paper>
            </main>
        );
    }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;
    
    submitSignup = (e) => {
        e.preventDefault();
        if( !this.formIsValid() ) {
            this.setState({ signUpErr: 'Passwords do not match!' });
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( authRes => {
                const userObj = {
                    email: authRes.user.email
                };

                firebase
                    .firestore()
                    .collection('users')
                    .doc(this.state.email)
                    .set(userObj)
                    .then( () => {
                        this.props.history.push('/dashboard')
                    }, dbErr => {
                        console.log(dbErr);
                        this.setState({ signUpErr: 'Failed to Add User' }); 
                    })
            }, authErr => {
               console.log(authErr);
               this.setState({ signUpErr: 'Failed to Add User' }); 
            })  
    }

    userTyping = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({ email: e.target.value });
                break;
            
            case 'password':
                this.setState({ password: e.target.value });
                break;
                
            case 'passwordConfirmation':
                this.setState({ passwordConfirmation: e.target.value })
                break;

            default:    
                break;
        }
    }
}

export default withStyles(styles)(SignUpComponent);