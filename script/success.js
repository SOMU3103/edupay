document.addEventListener("DOMContentLoaded", function () {
    const { jsPDF } = window.jspdf;

    const formData = JSON.parse(localStorage.getItem("formData"));

    if (formData) {
        document.getElementById("generatePDFBtn").addEventListener("click", function () {
            const doc = new jsPDF();

            doc.setFontSize(18);
            doc.text("FEES CHALLAN", 60, 20);
            doc.setFontSize(12);
            doc.text(`Student Name: ${formData.name}`, 10, 40);
            doc.text(`Email: ${formData.email}`, 10, 50);
            doc.text(`Phone: ${formData.phone}`, 10, 60);
            doc.text(`Roll Number: ${formData.rollNumber}`, 10, 70);
            doc.text(`Register Number: ${formData.registernumber}`, 10, 80);
            doc.text(`Branch: ${formData.branch}`, 10, 90);
            doc.text(`Amount: ${formData.denomination}`, 10, 100);
            doc.text(`Sum of Rupees: ${formData.sumofrupees}`, 10, 110);
            doc.text(`Fine Amount: ${formData.fineamount}`, 10, 120);
            doc.text(`Date: ${formData.date}`, 10, 130);
            doc.text(`Year: ${formData.year}`, 10, 140);

            doc.save("FEES CHALLAN.pdf");
        });
    } else {
        alert("No form data found.");
    }
});
