// Redirect with URL parameters from form.html
if (document.getElementById('paymentButton')) {
    document.getElementById('paymentButton').addEventListener('click', function () {
        // Collect form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const registerNumber = document.getElementById('registerNumber').value;
        const rollNumber = document.getElementById('rollNumber').value.toUpperCase(); // Convert to uppercase

        // Validate fields before redirecting
        if (!name || !email || !phone || !registerNumber || !rollNumber) {
            alert('Please fill in all required fields.');
            return;
        }

        // Redirect to pay.html with encoded query parameters
        window.location.href = `pay.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&registerNumber=${encodeURIComponent(registerNumber)}&rollNumber=${encodeURIComponent(rollNumber)}`;
    });
}

// Populate fields on payment.html
if (document.getElementById('paymentForm')) {
    const urlParams = new URLSearchParams(window.location.search);

    // Populate each field
    document.getElementById('name').value = urlParams.get('name') || '';
    document.getElementById('email').value = urlParams.get('email') || '';
    document.getElementById('phone') && (document.getElementById('phone').value = urlParams.get('phone') || '');
    document.getElementById('registerNumber').value = urlParams.get('registerNumber') || '';
    document.getElementById('rollNumber').value = (urlParams.get('rollNumber') || '').toUpperCase(); // Apply uppercase here
}
