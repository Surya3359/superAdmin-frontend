import { useState} from 'react';


export default function Login(){
    


    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      
      const [error, setError] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // Clear any previous errors
    
        // Basic validation
        if (!formData.email || !formData.password) {
          setError("All fields are required.");
          return;
        }
    
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError("Please enter a valid email address.");
          return;
        }
    
        // You can send the data to a backend server here
        console.log("Login successful with data:", formData);
        alert("Login successful!");
      };
    
      return (
        <div className="App">
          <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      );
};