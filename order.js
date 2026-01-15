const REPORT_TYPES = {
  "Basic Measurement": 50,
  "Detailed Report": 100,
  "Premium Analysis": 150
};

const SERVICE_TIERS = {
  Standard: 1,
  Express: 1.5,
  Rush: 2
};

const priceEl = document.getElementById("price");
const form = document.getElementById("orderForm");

function calculatePrice() {
  const report =
    document.querySelector('input[name="report"]:checked').value;
  const tier =
    document.querySelector('input[name="tier"]:checked').value;

  const total = REPORT_TYPES[report] * SERVICE_TIERS[tier];
  priceEl.textContent = total.toFixed(2);
  return total;
}

// Recalculate on change
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("change", calculatePrice);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const order = {
    property_address: document.getElementById("address").value,
    property_city: document.getElementById("city").value,
    property_state: document.getElementById("state").value,
    property_zip: document.getElementById("zip").value,
    report_type:
      document.querySelector('input[name="report"]:checked').value,
    service_tier:
      document.querySelector('input[name="tier"]:checked').value,
    price: calculatePrice()
  };

  console.log("Order:", order);

  alert("Order created (demo). Integrate PayPal / backend next.");
});
