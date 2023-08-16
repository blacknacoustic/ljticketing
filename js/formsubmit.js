// formSubmit.js

const firebaseConfig = {
    apiKey: "AIzaSyCW5l3tWQaQs5on6JXrApcxJhreYBuN1LY",
    authDomain: "ljelectronics-e94fb.firebaseapp.com",
    databaseURL: "https://ljelectronics-e94fb-default-rtdb.firebaseio.com",
    projectId: "ljelectronics-e94fb",
    storageBucket: "ljelectronics-e94fb.appspot.com",
    messagingSenderId: "389542626733",
    appId: "1:389542626733:web:640c57e9a28191a51c0d24",
    measurementId: "G-JMNYRPJBFS"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the form
  const form = document.getElementById('myForm');
  
  // Add a submit event listener to the form
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(form);
    const formDataObj = {};
  
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
  
    // Send the data to Firebase Realtime Database
    try {
      const databaseRef = firebase.database().ref('formData'); // Change 'formData' to your desired path
      await databaseRef.push(formDataObj);
  
      alert('Data submitted successfully!');
      form.reset();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  });
  