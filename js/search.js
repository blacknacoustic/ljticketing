// Initialize Firebase
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
  
  // Reference to the Firebase database
  const database = firebase.database();
  
  // Reference to the form and its elements
  const form = document.querySelector("form");
  const phoneInput = document.getElementById("phone");
  const repairIdInput = document.getElementById("repairid");
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
  
    const phoneNumber = phoneInput.value.trim();
    const repairId = repairIdInput.value.trim();
  
    if (!phoneNumber && !repairId) {
      alert("Please provide a phone number or repair ID.");
      return;
    }
  
    // Perform the search based on either phone number or repair ID
    let queryRef;
    if (phoneNumber) {
      queryRef = database.ref("repairForms").orderByChild("number").equalTo(phoneNumber);
    } else {
      queryRef = database.ref("repairForms");
    }
  
    queryRef.once("value", snapshot => {
      const results = snapshot.val();
  
      if (!results) {
        alert("No matching entries found.");
        return;
      }
  
      const searchResults = [];
  
      // Iterate through years
      for (const yearKey in results) {
        const yearData = results[yearKey];
  
        // Iterate through months
        for (const monthKey in yearData) {
          const monthData = yearData[monthKey];
  
          // Iterate through entries within the month
          for (const entryKey in monthData) {
            const entry = monthData[entryKey];
            if (repairId && entry.entryCode === repairId) {
              searchResults.push(entry);
            }
            if (phoneNumber && entry.number === phoneNumber) {
              searchResults.push(entry);
            }
          }
        }
      }
  
      if (searchResults.length === 0) {
        alert("No matching entries found.");
      } else {
        console.log("Search results:", searchResults);
        // You can iterate through the searchResults and display them as needed
      }
    });
  });
  