// CONTACT FORM

/* 
 * Wait for the DOM to finish loading, and add form submit event listener
 * Code adapted from EmailJS tutorial at
 * https://www.emailjs.com/docs/tutorial/creating-contact-form/
 */

// EmailJS Contact Form
document.addEventListener('DOMContentLoaded', function () {
    const feedbackSubmit = document.getElementsByClassName("submit-contact-button");

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        emailjs.init("LgGJwNhTPTHbw2LbP"); // https://dashboard.emailjs.com/admin/account

        // generate a five digit number for the contact_number variable EG. #7659
        this.contact_number.value = Math.random() * 100000 | 0;

        feedbackSubmit.value = 'Sending...';

        emailjs.sendForm('send_sci_fi_quiz', 'sci_fi_quiz_feedback', this)
            .then(function () {
                feedbackSubmit.value = 'Send Email';
                showThankYou();
            }, function (error) {
                console.log(JSON.stringify(err));
            });
    });
});

/**
 * Shows a thank you message in the form area once the form
 * has been sent
 * @function showThankYou
 */
function showThankYou() {
    let messageArea = document.getElementById('contact-container');
    let thankyouMessage = `
    <h2>YOUR MESSAGE HAS BEEN SENT</h2>
    <br>
    <p>Thank you for submitting your feedback or bug report!<br>We appreciate your contribution in improving our services. Our team will review your message and take appropriate action. We value your support and will be in touch if necessary.<br>Best regards,<br>Devan</p>`;

    messageArea.innerHTML = thankyouMessage;
}