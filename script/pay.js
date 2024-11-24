document.addEventListener("DOMContentLoaded", function () {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxXT77BmcfCF3tsCBp1rUoHySbBmIKYfNzuK553Ykhbbjl9aii_EFHucJB5dH3i5Wob/exec";

    const dateField = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateField.value = today;

    document.getElementById("paymentForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        if (handlePayment()) {
            const form = e.target;
            const formData = new FormData(form);

            try {
                await submitToGoogleSheets(formData);
                alert("Proceed to Payment");

                saveFormDataToLocalStorage(formData);

                
                window.location.href = "link.html";
            } catch (error) {
                alert("Error: Something went wrong.");
                console.error(error);
            }
        }
    });

    async function submitToGoogleSheets(formData) {
        const response = await fetch(scriptURL, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Google Sheets submission failed.");
        }
        return response;
    }

    function saveFormDataToLocalStorage(formData) {
        const formObj = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            rollNumber: formData.get("rollNumber"),
            registernumber: formData.get("registernumber"),
            branch: formData.get("branch"),
            denomination: formData.get("amount"),
            sumofrupees: formData.get("sumofrupees"),
            fineamount: formData.get("fineamount"),
            date: formData.get("date"),
            year: formData.get("year"),
        };
        localStorage.setItem("formData", JSON.stringify(formObj));
    }

    function handlePayment() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const rollNumber = document.getElementById("rollNumber").value.trim();
        const registernumber = document.getElementById("registerNumber").value.trim();
        const branch = document.getElementById("branch").value.trim();
        const denomination = document.getElementById("denomination").value.trim();
        const sumofrupees = document.getElementById("sumofrupees").value.trim();
        const fineamount = document.getElementById("fineamount").value.trim();
        const date = document.getElementById("date").value.trim();
        const year = document.getElementById("year").value.trim();

        if (!name || !email || !phone || !rollNumber || !registernumber || !branch || !denomination || !sumofrupees || !fineamount || !date || !year) {
            alert("Please fill in all fields.");
            return false;
        }

        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return false;
        }

        if (isNaN(denomination) || parseFloat(denomination) <= 0) {
            alert("Please enter a valid amount.");
            return false;
        }

        return true;
    }
});
