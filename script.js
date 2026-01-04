// 1. Navigation & Modal Logic
const modal = document.getElementById("orderModal");
const orderBtns = document.querySelectorAll(".order-trigger");
const closeBtn = document.querySelector(".close-modal");

orderBtns.forEach(btn => {
    btn.onclick = () => modal.style.display = "block";
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}

// 2. Multi-step Form Logic
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    
    document.getElementById('step' + step).classList.remove('hidden');
    document.getElementById('step' + step + '-indicator').classList.add('active');
}

// 3. FAQ Accordion Logic
document.querySelectorAll('.faq-item').forEach(item => {
    item.onclick = () => {
        const answer = item.querySelector('.faq-answer');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    };
});

// 4. Google Sheets Submission Logic
const orderForm = document.getElementById('orderForm');
const submitBtn = document.getElementById('submitBtn');

orderForm.onsubmit = async (e) => {
    e.preventDefault();
    
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    const formData = new FormData(orderForm);
    const data = Object.fromEntries(formData.entries());
    
    // Add timestamp
    data.timestamp = new Date().toLocaleString();

    /* 
       INSTRUCTIONS FOR GOOGLE SHEETS:
       1. Open a Google Sheet.
       2. Go to Extensions -> Apps Script.
       3. Paste the Apps Script code (provided below).
       4. Deploy as Web App -> Access: "Anyone".
       5. Copy the Web App URL and paste it below in the 'fetch' function.
    */

    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEBHOOK_URL_HERE';

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for cross-origin
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        alert("Order Placed Successfully! We will verify and deliver your report to your email.");
        modal.style.display = "none";
        orderForm.reset();
        nextStep(1);
    } catch (error) {
        console.error("Error!", error.message);
        alert("Payment processed, but data sync failed. Please contact support.");
    } finally {
        submitBtn.innerText = "Complete Order & Pay";
        submitBtn.disabled = false;
    }
};
