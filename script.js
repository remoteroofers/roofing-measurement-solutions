orderForm.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    const formData = new FormData(orderForm);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toLocaleString();

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZ6w461PjqVcygYYFWQBetK1qZZvZ7ig6gn964qT1pT3ZdN6doHOyjMlVpZO7Hdu0l/exec'; // Replace with your actual URL
                            
    try {
        // We use 'method: POST' and 'mode: no-cors' for Google Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        alert("Order Received! Our team will verify the property and contact you shortly.");
        modal.style.display = "none";
        orderForm.reset();
        nextStep(1);
    } catch (error) {
        console.error("Error:", error);
        alert("Connection error. Please try again.");
    } finally {
        submitBtn.innerText = "Complete Order & Pay";
        submitBtn.disabled = false;
    }
};
