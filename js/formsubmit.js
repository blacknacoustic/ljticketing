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

// Reference to the form
const form = document.getElementById("myForm");

// Listen for form submission
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const name = form.name.value;
  const date = form.date.value;
  const number = form.number.value;
  const modelnum = form.modelnum.value;
  const serialnum = form.serialnum.value;
  const description = form.description.value;
  const items = form.items.value;

  // Parse the date to get year and month
  const selectedDate = new Date(date);
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1; // JavaScript months are zero-based

  // Create an object with form data
  const formData = {
    name: name,
    date: date,
    number: number,
    modelnum: modelnum,
    serialnum: serialnum,
    description: description,
    items: items
  };

  // Reference to the Firebase database
  const database = firebase.database();

  // Push form data to the database under year and month
  database.ref("repairForms").child(year).child(month).push(formData, function(error) {
    if (error) {
      console.error("Error saving data:", error);
    } else {
      console.log("Data saved successfully!");
      form.reset(); // Clear the form after submission
    }
  });
});