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

      if (res.error) {
        alert(res.error);
        return;
      }

      alert("Logged in successfully!");
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/map");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* ✅ Wrap everything in form */}
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h2
              style={{
                color: "#333",
                fontSize: "28px",
                fontWeight: "600",
                margin: "0",
                letterSpacing: "-0.5px",
              }}
            >
              Welcome Back
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                margin: "8px 0 0 0",
              }}
            >
              Please sign in to your account
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e1e5e9",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                backgroundColor: "#fafbfc",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.backgroundColor = "#fafbfc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                color: "#333",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e1e5e9",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                transition: "all 0.3s ease",
                backgroundColor: "#fafbfc",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#17b938ff";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.backgroundColor = "#fafbfc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              transform: "translateY(0)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "translateY(1px)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
          >
            Sign In
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "1px solid #e1e5e9",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                margin: "0",
              }}
            >
              Don't have an account?
              <a
                onClick={() => navigate("/register")}
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
