import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const Login = (props) => {
    const { email, setEmail, password, setPassword, handleLogin, handleSignup, emailError, passwordError } = props;

    const [hasAccount, setHasAccount] = useState(false);

    return (
        <section className="login">
            <label>
                <TextField label="Email" variant="outlined" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <TextField label="Password" type="password" variant="outlined" autoFocus required value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                {hasAccount ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Sign in
                            </Button>
                        <p>Dont have an account? <span className="authlink" onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                    </>
                ) : (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSignup}>
                            Sign up
                            </Button>
                        <p>Already registered? <span className="authlink" onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>

                    </>
                )}
                <p className="autherror">{emailError}</p>
                <p className="autherror">{passwordError}</p>
            </div>
        </section>
    )
}

export default Login;