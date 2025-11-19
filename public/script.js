// JavaScript to handle modal display and form submission

document.addEventListener('DOMContentLoaded', () => {
  const contactButton = document.getElementById('contactButton');
  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');

  // Show modal when contact button is clicked
  contactButton.addEventListener('click', () => {
    contactModal.style.display = 'flex';
  });

  // Hide modal when clicking outside the modal content
  contactModal.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });

  // Handle form submission via AJAX
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      company: document.getElementById('company').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
        contactModal.style.display = 'none';
      } else {
        alert('There was an issue sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please check your network connection.');
    }
  });
});
