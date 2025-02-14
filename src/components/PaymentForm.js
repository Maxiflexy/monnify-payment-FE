import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    customerName: "",
    customerEmail: "",
    paymentDescription: "",
    redirectUrl: "http://localhost:3000/payment-success",  // Change this if needed
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/payments/initiate",
        paymentDetails
      );

      const checkoutUrl = response.data.replace("Payment initiated successfully. Redirect to: ", "");

      // Redirect to the Monnify payment page
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setError("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Initiate Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={paymentDetails.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Customer Email:</label>
          <input
            type="email"
            name="customerEmail"
            value={paymentDetails.customerEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Payment Description:</label>
          <input
            type="text"
            name="paymentDescription"
            value={paymentDetails.paymentDescription}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Initiate Payment"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PaymentForm;
