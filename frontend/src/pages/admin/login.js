import React, { useState } from "react";
import { handleLogin } from "../../services/Auth";
import Layout from "../../components/Layout/Layout";
import { navigate } from "@reach/router";
import { Label, Input, Spinner, Box, Button } from "theme-ui";

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
          navigate("/", { state: { message: "You are now logged in" } });
        } else {
          setProcessing(false);
          setError("User name and password doesn't exist");
        }
      });
    }
  };

  return (
    <Layout>
      {processing ? <Spinner /> : <></>}
      <Box as="form" onSubmit={(e) => e.preventDefault()}>
        {error && (
          <div className="form-error">
            <p>{error}</p>
          </div>
        )}
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          mb={3}
        />
        <Label htmlFor="password">Password</Label>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Layout>
  );
};
export default SignIn;
