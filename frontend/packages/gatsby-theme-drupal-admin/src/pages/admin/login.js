// @file Creates the page at admin/login page and form.

// External Imports
import { Button, Card, Input, Spinner } from "theme-ui";
import React, { useState } from "react";

// Internal Imports
import { handleLogin } from "@powerstack/drupal-oauth-connector";
import Layout from "gatsby-theme-core-design-system/src/components/Layout/Layout";

// Login page
const LoginPage = () => {
  // Function constants
  // Setup states
  const [processing, setProcessing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Submit handler logic
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
    <Layout>
      <Card as="form" onSubmit={(e) => e.preventDefault()} sx={{m: 6, p: 5, textAlign: `center`}}>
        {error && (
          <div className="form-error">
            <p>{error}</p>
          </div>
        )}
        <Input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          mb={3}
        />
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
      </Card>
    </Layout>
  );
};
export default LoginPage;
