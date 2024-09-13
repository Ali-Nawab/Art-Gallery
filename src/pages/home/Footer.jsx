import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // Add your subscription logic here
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    } else {
      alert("Please enter an email address");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>&copy; {new Date().getFullYear()} Your Website. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <h3>Subscribe to our Newsletter</h3>
          <div className="subscribe-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
