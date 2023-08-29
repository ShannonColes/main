import { useState } from "react";
import { useLogin } from "./hooks/useLogin";
import ProjectForm from "./components/ProjectForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <>
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login: </h3>

      <label>Email: </label>
      <input
        className="login-signup-input"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password: </label>
      <input
        className="login-signup-input"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
    <ProjectForm/>
    </>
  );
};

export default Login;
