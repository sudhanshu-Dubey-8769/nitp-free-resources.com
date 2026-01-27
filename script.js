/**
 * NITP Resources - Visitor Counter Logic
 * Features: Unique Visitors (via LocalStorage) & Total Hits
 * Backend: Firebase Realtime Database
 */

// 1. Function to Load Footer
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            
            // IMPORTANT: After the footer is loaded, we must restart 
            // the Firebase listeners so they find the new #visits spans!
            startFirebaseStats(); 
        })
        .catch(err => console.error("Error loading footer:", err));
}

// 2. Wrap your Firebase logic in a function so it can wait for the footer
function startFirebaseStats() {
    const uniqueRef = database.ref("uniqueVisitorCount");
    const totalRef = database.ref("totalHitsCount");

    uniqueRef.on("value", s => {
        const el = document.getElementById("visits");
        if(el) el.innerText = s.val() || 0;
    });

    totalRef.on("value", s => {
        const el = document.getElementById("total-hits");
        if(el) el.innerText = s.val() || 0;
    });
}

// 3. Run the load function when the page opens
loadFooter();

// ... Keep your Firebase configuration and increment logic here as usual ...

const firebaseConfig = {
    apiKey: "AIzaSyCVlMtC8hPwKbUSGne5xdA-ynx0mQj6NnY",
    authDomain: "count-824113.firebaseapp.com",
    databaseURL: "https://count-824113-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "count-824113",
    storageBucket: "count-824113.firebasestorage.app",
    messagingSenderId: "316809793611",
    appId: "1:316809793611:web:d61f65069eb6d58e853dce"
};

// 1. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 2. Define Database References
const uniqueRef = database.ref("uniqueVisitorCount");
const totalRef = database.ref("totalHitsCount");

// 3. Increment Counters with Safety (Try-Catch)
try {
    // ALWAYS increment Total Hits (Every refresh)
    totalRef.transaction((current) => {
        return (current || 0) + 1;
    });

    // ONLY increment Unique Visitors (First time only)
    if (!localStorage.getItem("hasVisited")) {
        uniqueRef.transaction((current) => {
            return (current || 0) + 1;
        });
        // Mark user as visited so they aren't counted as 'Unique' again
        localStorage.setItem("hasVisited", "true");
        console.log("%c🌟 New unique visitor detected!", "color: #00ff88; font-weight: bold;");
    } else {
        console.log("%c🏠 Welcome back, returning visitor!", "color: #00d4ff; font-weight: bold;");
    }
} catch (error) {
    // If an ad-blocker or firewall stops Firebase, the site won't crash
    console.warn("Firebase Transaction failed (likely blocked by browser):", error);
}

// 4. Update the UI for Unique Visitors (Realtime Listener)
uniqueRef.on("value", (snapshot) => {
    const uniqueVal = snapshot.val() || 0;
    const element = document.getElementById("visits");
    if (element) {
        element.textContent = uniqueVal;
    }
});

// 5. Update the UI for Total Hits (Realtime Listener)
totalRef.on("value", (snapshot) => {
    const totalVal = snapshot.val() || 0;
    const element = document.getElementById("total-hits");
    if (element) {
        element.textContent = totalVal;
    }
});