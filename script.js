// Path to the MP3 file you want to play
const alertSound = 'sounds/alert.mp3'; // Update the path to your mp3 file
let soundPlayed = false; // Flag to ensure the sound only plays once

// Function to play the alert sound
function playAlertSound() {
    const audio = new Audio(alertSound);
    audio.play();
}

// Specify the exact time when the sound should play
const targetDays = 43;
const targetHours = 2;
const targetMinutes = 53;
const targetSeconds = 42;

// Function to fetch the current EST time from WorldTimeAPI
async function fetchCurrentTime() {
    const response = await fetch('https://worldtimeapi.org/api/timezone/America/New_York');
    const data = await response.json();
    return new Date(data.datetime); // Returns the current time in EST
}

// Function to start the countdown based on the initial API time
async function startCountdown() {
    const currentETDate = await fetchCurrentTime();

    // Set target date and time: 7 PM EST on November 5th
    const targetDate = new Date('November 5, 2024 19:00:00 GMT-0500'); // GMT-0500 for EST

    // Calculate the initial time difference
    let diff = targetDate - currentETDate;

    function updateCountdown() {
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

        // Decrease the difference by one second for the next iteration
        diff -= 1000;
    }

    // Update the countdown every second
    setInterval(updateCountdown, 1000);
}

// Function to remove the interaction overlay when user clicks
function enableAudio() {
    document.getElementById('interaction-overlay').style.display = 'none';
    startCountdown(); // Start the countdown immediately after interaction
}

// Attach the click event to the overlay
document.getElementById('interaction-overlay').addEventListener('click', enableAudio);
