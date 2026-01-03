function submitOrder() {
fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
method: "POST",
body: JSON.stringify({
package: document.getElementById('package').value,
date: new Date().toLocaleString()
})
}).then(() => alert('Order Submitted'));
}
