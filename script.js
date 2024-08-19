// Function to display the countdown to 7 PM EST on November 3rd
function updateCountdown() {
    const now = new Date();
    const currentET = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const currentETDate = new Date(currentET);

    // Set target date and time: 7 PM EST on November 3rd
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

    const formattedTime = `${days} |  ${hours}:${minutes}:${seconds}`;
    document.getElementById('time').textContent = formattedTime;
}

// Update countdown initially and refresh every second
updateCountdown();
setInterval(updateCountdown, 1000);
