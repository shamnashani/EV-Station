import React from "react";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Razorpay() {
  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_MJOAVy77oMVaYv", // public key
      amount: 2000, // amount in paise (₹20)
      currency: "INR",
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      handler: function (response) {
        alert("Transaction successful: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Rajat",
        email: "rajat@rajat.com",
        phone_number: "9899999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Razorpay payment portal ezzzz</p>
        <button onClick={showRazorpay} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Pay now
        </button>
      </header>
    </div>
  );
}

export default Razorpay;