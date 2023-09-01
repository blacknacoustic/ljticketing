// formSubmit.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('myForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
    const response = await fetch('https://script.google.com/macros/s/AKfycbzC7BglF_aTJrKj5BuUUXJ-vmSgSS3fWFsmbCmQMb4T4nySOxElUbsfOW5lFr2ppPil/exec', {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Form submitted successfully');
      form.reset();
    } else {
      alert('Form submission failed');
    }
  });
});
