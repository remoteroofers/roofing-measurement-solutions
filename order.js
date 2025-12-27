document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(this));

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify(data)
  });

  // Redirect to Stripe
  window.location.href = "https://buy.stripe.com/YOUR_PAYMENT_LINK";
});
