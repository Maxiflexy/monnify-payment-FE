import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentForm from "./components/PaymentForm";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Monnify Payment Gateway</h1>
        <Routes>
          <Route path="/" element={<PaymentForm />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
