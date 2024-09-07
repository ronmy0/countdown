// Path to the MP3 file you want to play
const alertSound = 'sounds/alert.mp3'; // Update the path to your mp3 file
let soundPlayed = false; // Flag to ensure the sound only plays once

// Function to play the alert sound
function playAlertSound() {
    const audio = new Audio(alertSound);
    audio.play();
}

// Specify the exact time when the sound should play
const targetDays = 0;
const targetHours = 0;
const targetMinutes = 3;
const targetSeconds = 42;

// Function to display the countdown to 7 PM EST on November 3rd
function updateCountdown() {
    const now = new Date();

    // Get the current time in Eastern Time (EST)
    const currentET = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const currentETDate = new Date(currentET);

    // Set target date and time: 7 PM EST on November 5th
    const targetDate = new Date('November 5, 2024 19:00:00 GMT-0500'); // GMT-0500 for EST

    const diff = targetDate - currentETDate; // Difference in milliseconds

    if (diff < 0) {
        document.getElementById('time').textContent = "Event has passed";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

    const formattedTime = `${days} | ${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = formattedTime;

    // Play sound at the specified countdown target
    if (
        days === targetDays &&
        hours === String(targetHours).padStart(2, '0') &&
        minutes === String(targetMinutes).padStart(2, '0') &&
        seconds === String(targetSeconds).padStart(2, '0') &&
        !soundPlayed
    ) {
        playAlertSound(); // Play the sound
        soundPlayed = true; // Ensure the sound only plays once
    }
}

// Function to remove the interaction overlay when user clicks
function enableAudio() {
    document.getElementById('interaction-overlay').style.display = 'none';
    updateCountdown(); // Start the countdown immediately after interaction
    setInterval(updateCountdown, 1000); // Continue updating every second
}

// Attach the click event to the overlay
document.getElementById('interaction-overlay').addEventListener('click', enableAudio);
