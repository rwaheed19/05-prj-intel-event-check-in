// Attendance goal
const attendanceGoal = 50;

// STATE
let attendeeCount = Number(localStorage.getItem("attendeeCount")) || 0;
let waterCount = Number(localStorage.getItem("waterCount")) || 0;
let zeroCount = Number(localStorage.getItem("zeroCount")) || 0;
let powerCount = Number(localStorage.getItem("powerCount")) || 0;

// FIX: load attendees properly ON START
let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

// ELEMENTS
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

const attendeeList = document.getElementById("attendeeList");

// INITIAL UI LOAD
function updateUIBase() {
  attendeeCountDisplay.textContent = attendeeCount;
  waterCountDisplay.textContent = waterCount;
  zeroCountDisplay.textContent = zeroCount;
  powerCountDisplay.textContent = powerCount;

  const progress = Math.min((attendeeCount / attendanceGoal) * 100, 100);

  progressBar.style.width = progress + "%";

  displayAttendees();
}

updateUIBase();

// RESET BUTTON
resetBtn.addEventListener("click", function () {
  if (!confirm("Reset all attendance data?")) {
    return;
  }

  localStorage.clear();

  attendeeCount = 0;
  waterCount = 0;
  zeroCount = 0;
  powerCount = 0;
  attendees = [];

  attendeeCountDisplay.textContent = 0;
  waterCountDisplay.textContent = 0;
  zeroCountDisplay.textContent = 0;
  powerCountDisplay.textContent = 0;

  progressBar.style.width = "0%";

  attendeeList.innerHTML = "";
  greeting.style.display = "none";
  celebration.style.display = "none";
});

// FORM SUBMIT
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = attendeeName.value.trim();
  const team = teamSelect.value;

  if (!name || !team) return;

  if (attendees.some((a) => a.name.toLowerCase() === name.toLowerCase())) {
    alert("Already checked in!");
    return;
  }

  let teamName = "";

  if (team === "water") {
    waterCount++;
    teamName = "🌊 Team Water Wise";
  } else if (team === "zero") {
    zeroCount++;
    teamName = "🌿 Team Net Zero";
  } else if (team === "power") {
    powerCount++;
    teamName = "⚡ Team Renewables";
  }

  attendeeCount++;

  // Add attendee
  attendees.push({
    name: name,
    team: teamName,
  });

  // SAVE TO LOCAL STORAGE
  localStorage.setItem("attendees", JSON.stringify(attendees));
  localStorage.setItem("attendeeCount", attendeeCount);
  localStorage.setItem("waterCount", waterCount);
  localStorage.setItem("zeroCount", zeroCount);
  localStorage.setItem("powerCount", powerCount);

  // UPDATE UI
  attendeeCountDisplay.textContent = attendeeCount;
  waterCountDisplay.textContent = waterCount;
  zeroCountDisplay.textContent = zeroCount;
  powerCountDisplay.textContent = powerCount;

  const progress = Math.min((attendeeCount / attendanceGoal) * 100, 100);

  greeting.style.display = "block";
  greeting.textContent = `Welcome ${name}! You checked into ${teamName}.`;
  greeting.className = "success-message";

  displayAttendees();
  checkLevelUps();

  form.reset();
});

// ATTENDEE LIST
function displayAttendees() {
  attendeeList.innerHTML = "";

  attendees.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = `👤 ${a.name} — ${a.team}`;
    attendeeList.appendChild(li);
  });
}

// LEVEL UPS
function checkLevelUps() {
  // LEVEL UP 1
  if (attendeeCount >= 5) {
    greeting.style.display = "block";
    greeting.textContent = "🔥 Level Up 1 Unlocked: First milestone reached!";
  }

  // LEVEL UP 2
  if (attendeeCount >= 15) {
    greeting.textContent = "🚀 Level Up 2: Event gaining strong momentum!";
  }

  // LEVEL UP 3
  if (attendeeCount >= 30) {
    let winningTeam = "Tie";

    if (waterCount > zeroCount && waterCount > powerCount) {
      winningTeam = "🌊 Team Water Wise";
    } else if (zeroCount > powerCount && zeroCount > waterCount) {
      winningTeam = "🌿 Team Net Zero";
    } else if (powerCount > waterCount && powerCount > zeroCount) {
      winningTeam = "⚡ Team Renewables";
    }

    celebration.style.display = "block";
    celebration.textContent = `🎉 Attendance Goal Reached! Congratulations ${winningTeam}!`;
  }

  // FINAL GOAL CELEBRATION
  if (attendeeCount >= attendanceGoal) {
    let winner = "Tie";

    if (waterCount > zeroCount && waterCount > powerCount) {
      winner = "🌊 Team Water Wise";
    } else if (zeroCount > waterCount && zeroCount > powerCount) {
      winner = "🌿 Team Net Zero";
    } else if (powerCount > waterCount && powerCount > zeroCount) {
      winner = "⚡ Team Renewables";
    } else {
      winner = "🤝 Tie";
    }

    celebration.style.display = "block";
    celebration.textContent = `🎉 GOAL REACHED! Congratulations to ${winner} for highest turnout!`;
  }
}
