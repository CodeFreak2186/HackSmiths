import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
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
        {/* ✅ Wrap everything inside a form */}
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
              Create Account
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                margin: "8px 0 0 0",
              }}
            >
              Join us today and get started
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
                e.target.style.borderColor = "#11998e";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(17, 153, 142, 0.1)";
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
              placeholder="Create a strong password"
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
                e.target.style.borderColor = "#11998e";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(17, 153, 142, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e5e9";
                e.target.style.backgroundColor = "#fafbfc";
                e.target.style.boxShadow = "none";
              }}
            />
            <p
              style={{
                color: "#888",
                fontSize: "12px",
                margin: "6px 0 0 0",
              }}
            >
              Use at least 8 characters with a mix of letters and numbers
            </p>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(17, 153, 142, 0.3)",
              transform: "translateY(0)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 25px rgba(17, 153, 142, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(17, 153, 142, 0.3)";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "translateY(1px)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
          >
            Create Account
          </button>

          <div
            style={{
              background: "rgba(17, 153, 142, 0.05)",
              borderRadius: "12px",
              padding: "16px",
              marginTop: "20px",
              border: "1px solid rgba(17, 153, 142, 0.1)",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "13px",
                margin: "0",
                lineHeight: "1.4",
              }}
            >
              By creating an account, you agree to our Terms of Service and
              Privacy Policy. We'll keep your information secure and never share
              it with third parties.
            </p>
          </div>

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
              Already have an account?
              <a
                href="/login"
                style={{
                  color: "#11998e",
                  textDecoration: "none",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
