// Google Pay Initialization
function onGooglePayLoaded() {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
    const isReadyToPayRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'example', // Replace with your gateway
                    gatewayMerchantId: 'exampleGatewayMerchantId' // Replace with your merchant ID
                }
            }
        }]
    };

    paymentsClient.isReadyToPay(isReadyToPayRequest)
        .then(response => {
            if (response.result) {
                const button = paymentsClient.createButton({
                    onClick: onGooglePayButtonClicked
                });
                document.getElementById('gpay-button').appendChild(button);
            } else {
                console.error("Google Pay is not available.");
            }
        })
        .catch(err => console.error("Error loading Google Pay:", err));
}

// Handle Google Pay Button Click
function onGooglePayButtonClicked() {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
    const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'example', // Replace with your gateway
                    gatewayMerchantId: 'exampleGatewayMerchantId' // Replace with your merchant ID
                }
            }
        }],
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '2500', // Replace with actual amount
            currencyCode: 'INR'
        },
        merchantInfo: {
            merchantName: 'MAHENDRA GROUPS' // Replace with your business name
        }
    };

    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
            console.log("Payment successful:", paymentData);
            alert("Payment successful!");
            window.location.href = "success.html";
        })
        .catch(err => {
            console.error("Payment failed:", err);
            window.location.href = "error.html";
        });
}

// Net Banking Payment Handling
document.getElementById('proceedPayment').addEventListener('click', function () {
    const bankSelect = document.getElementById('bankSelect');
    const selectedBank = bankSelect.value;

    if (!selectedBank) {
        alert('Please select a bank before proceeding.');
    } else {
        window.location.href = selectedBank;
    }
});
