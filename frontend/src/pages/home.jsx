import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>Smart FRA Atlas</h1>
      <p>Interactive FRA map with DSS recommendations</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
};

export default Home;
