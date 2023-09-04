import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js'
// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyCW5l3tWQaQs5on6JXrApcxJhreYBuN1LY",
  authDomain: "ljelectronics-e94fb.firebaseapp.com",
  databaseURL: "https://ljelectronics-e94fb-default-rtdb.firebaseio.com",
  projectId: "ljelectronics-e94fb",
  storageBucket: "ljelectronics-e94fb.appspot.com",
  messagingSenderId: "389542626733",
  appId: "1:389542626733:web:e8a94549e03f63281c0d24",
  measurementId: "G-SC116PD2GD"
};

const app = initializeApp(firebaseConfig);

// Reference to the form
const form = document.getElementById("myForm");
  
// Reference to the Firestore database
const db = getFirestore(app);

// Listen for form submission
// Assuming your Firebase and Firestore have been initialized correctly

// Add an event listener to the form
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const name = form.name.value;
  const date = form.date.value;
  const number = form.number.value;
  const modelnum = form.modelnum.value;
  const serialnum = form.serialnum.value;
  const description = form.description.value;
  const items = form.items.value;

  try {
    // Parse the date to get year and month
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // JavaScript months are zero-based

    // Generate a unique entry number
    const entrySnapshot = await db.collection("entryNumber").doc("latest").get();
    let latestEntryNumber = entrySnapshot.exists ? entrySnapshot.data().number : 0;
    latestEntryNumber++;
    const entryCode = `CR${latestEntryNumber.toString().padStart(6, "0")}`;

    // Update the entry number in Firestore
    await db.collection("entryNumber").doc("latest").set({ number: latestEntryNumber });

    // Create an object with form data
    const formData = {
      name: name,
      date: date,
      number: number,
      modelnum: modelnum,
      serialnum: serialnum,
      description: description,
      items: items,
      entryCode: entryCode,
    };

    // Push form data to Firestore
    await db.collection("repairForms").doc(year.toString()).collection(month.toString()).add(formData);

    console.log("Data saved successfully!");
    form.reset(); // Reset the form after successful submission
  } catch (error) {
    console.error("Error:", error); // Handle any potential errors
  }
});

