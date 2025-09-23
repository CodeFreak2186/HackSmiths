import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser({ email, password });
    
    if (res.error) {       // check if backend returned error in body
      alert(res.error);
      return;
    }
    alert("Logged in successfully!");
    

    // Optionally store user info
    localStorage.setItem("user", JSON.stringify(res.user));
    navigate("/map");
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
