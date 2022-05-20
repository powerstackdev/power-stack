/** @jsx jsx */
import { jsx } from "theme-ui";
import { Button, Box, Input, Spinner, Grid, Label } from "theme-ui";
import { StaticImage } from 'gatsby-plugin-image';
import React, { useState } from "react";
import { handleLogin } from "@powerstack/drupal-oauth-connector";

const SignIn = () => {
  const [processing, setProcessing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!username && !password) {
      setProcessing(false);
      setError("Incorrect username or password, please try again.");
    } else {
      handleLogin(username, password).then((res) => {
        if (res !== undefined && res) {
          localStorage.setItem("username", JSON.stringify(username));
          setProcessing(false);
          window.location.href = "/admin/content";
        } else {
          setProcessing(false);
          setError("User name and password doesn't exist");
        }
      });
    }
  };

  return (
    <Grid
      columns={[1, null, null, 2]}
      sx={{
      background: 'white',
      minHeight: '100vh',
      height: '100%',
      width: '100vw',
    }}>
      <Box>

        <Box as="form" onSubmit={(e) => e.preventDefault()} sx={{m: [2, 3, null, 5], p: 5, textAlign: `center`}}>
          {error && (
            <div className="form-error">
              <p>{error}</p>
            </div>
          )}
          <h2>Welcome back</h2>
          <h3>Welcome back! Please enter your details</h3>
          <Label>Username</Label>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            mb={3}
          />
          <Label>Password</Label>
          <Input
            type="password"
            className="form-input"
            name="password"
            type="password"
            id="passwordSignin"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            mb={3}
          />
          {processing ? <Spinner/> : <Button onClick={handleSubmit}>Login</Button>}
        </Box>
      </Box>
      <Box >
        <StaticImage src={'https://images.unsplash.com/photo-1518709911915-712d5fd04677?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2788&q=80'}  sx={{
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
          maxHeight: '100vh',
          height: '100%',
          display: ['none', null, null, 'block']
        }}/>
      </Box>
    </Grid>
  );
};
export default SignIn;
