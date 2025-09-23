import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link> | 
      <Link to="/map">Map</Link> | 
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
