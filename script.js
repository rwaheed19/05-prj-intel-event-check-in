// Attendance Goal
const attendanceGoal = 50;

// Attendance Counters
let attendeeCount = 0;
let waterCount = 0;
let zeroCount = 0;
let powerCount = 0;
let attendees = [];

// Load saved attendance data
const savedAttendance = localStorage.getItem("attendeeCount");
const savedWater = localStorage.getItem("waterCount");
const savedZero = localStorage.getItem("zeroCount");
const savedPower = localStorage.getItem("powerCount");

if (savedAttendance !== null) {
  attendeeCount = Number(savedAttendance);
}

if (savedWater !== null) {
  waterCount = Number(savedWater);
}

if (savedZero !== null) {
  zeroCount = Number(savedZero);
}

if (savedPower !== null) {
  powerCount = Number(savedPower);
}

// Grab page elements
const form = document.getElementById("checkInForm");
const attendeeName = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");

const attendeeCountDisplay = document.getElementById("attendeeCount");

const waterCountDisplay = document.getElementById("waterCount");
const zeroCountDisplay = document.getElementById("zeroCount");
const powerCountDisplay = document.getElementById("powerCount");

const progressBar = document.getElementById("progressBar");
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function () {
  localStorage.clear();

  attendeeCount = 0;
  waterCount = 0;
  zeroCount = 0;
  powerCount = 0;

  attendees = [];

  location.reload();
});

const attendeeList = document.getElementById("attendeeList");

// Display saved values
attendeeCountDisplay.textContent = attendeeCount;

waterCountDisplay.textContent = waterCount;
zeroCountDisplay.textContent = zeroCount;
powerCountDisplay.textContent = powerCount;

// Restore progress bar
const savedProgress = (attendeeCount / attendanceGoal) * 100;
progressBar.style.width = savedProgress + "%";

// Listen for check-in
form.addEventListener("submit", function (event) {
  // Stop page refresh
  event.preventDefault();

  // Get values
  const name = attendeeName.value;
  const team = teamSelect.value;

  // Increase total attendance
  attendeeCount++;

  // Update total display
  attendeeCountDisplay.textContent = attendeeCount;

  // Increase correct team
  if (team === "water") {
    waterCount++;
    waterCountDisplay.textContent = waterCount;
  }

  if (team === "zero") {
    zeroCount++;
    zeroCountDisplay.textContent = zeroCount;
  }

  if (team === "power") {
    powerCount++;
    powerCountDisplay.textContent = powerCount;
  }

  // Save updated counts
  localStorage.setItem("attendeeCount", attendeeCount);

  localStorage.setItem("waterCount", waterCount);

  localStorage.setItem("zeroCount", zeroCount);

  localStorage.setItem("powerCount", powerCount);

  const savedAttendees = localStorage.getItem("attendees");

  if (savedAttendees !== null) {
    attendees = JSON.parse(savedAttendees);
  }

  localStorage.setItem("attendees", JSON.stringify(attendees));

  // Progress percentage
  const progress = (attendeeCount / attendanceGoal) * 100;

  // Update progress bar
  progressBar.style.width = progress + "%";
  displayAttendees();

  // Team names for greeting
  let teamName = "";

  if (team === "water") {
    teamName = "Team Water Wise";
  }

  if (team === "zero") {
    teamName = "Team Net Zero";
  }

  if (team === "power") {
    teamName = "Team Renewables";
  }

  attendees.push({
    name: name,

    team: teamName,
  });

  // Greeting
  greeting.textContent = `Welcome ${name}! You checked into ${teamName}.`;

  greeting.style.display = "block";
  greeting.className = "success-message";

  // Check if attendance goal has been reached

  if (attendeeCount >= attendanceGoal) {
    let winningTeam = "";
    let winningCount = 0;

    if (waterCount > winningCount) {
      winningCount = waterCount;
      winningTeam = "🌊 Team Water Wise";
    }

    if (zeroCount > winningCount) {
      winningCount = zeroCount;
      winningTeam = "🌿 Team Net Zero";
    }

    if (powerCount > winningCount) {
      winningCount = powerCount;
      winningTeam = "⚡ Team Renewables";
    }

    celebration.style.display = "block";

    celebration.textContent = `🎉 Attendance Goal Reached! Congratulations to ${winningTeam} for having the highest turnout with ${winningCount} attendees!`;
  }

  // Reset form
  form.reset();
});

function displayAttendees() {
  attendeeList.innerHTML = "";

  attendees.forEach(function (attendee) {
    const li = document.createElement("li");

    li.textContent = `👤 ${attendee.name} — ${attendee.team}`;

    attendeeList.appendChild(li);
  });
}
