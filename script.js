// Load attendee list from localStorage
function loadAttendeeList() {
  const attendeeListWater = document.getElementById("attendeeListWater");
  const attendeeListZero = document.getElementById("attendeeListZero");
  const attendeeListPower = document.getElementById("attendeeListPower");
  attendeeListWater.innerHTML = "";
  attendeeListZero.innerHTML = "";
  attendeeListPower.innerHTML = "";
  let attendees = [];
  if (localStorage.getItem("attendees")) {
    attendees = JSON.parse(localStorage.getItem("attendees"));
  }
  attendees.forEach(function (att) {
    const li = document.createElement("li");
    li.textContent = att.name;
    if (att.team === "Water Wise") {
      attendeeListWater.appendChild(li);
    } else if (att.team === "Net Zero") {
      attendeeListZero.appendChild(li);
    } else if (att.team === "Renewables") {
      attendeeListPower.appendChild(li);
    }
  });
}

// Initial load
loadAttendeeList();
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const totAttendees = document.getElementById("attendeeCount");
const waterCounter = document.getElementById("waterCount");
const zeroCounter = document.getElementById("zeroCount");
const powerCounter = document.getElementById("powerCount");

// track attendance

let count = 0;
const maxCount = 50;

// Load counts from localStorage if available
if (localStorage.getItem("attendeeCount")) {
  count = parseInt(localStorage.getItem("attendeeCount"));
  totAttendees.textContent = count;
}
if (localStorage.getItem("waterCount")) {
  waterCounter.textContent = localStorage.getItem("waterCount");
}
if (localStorage.getItem("zeroCount")) {
  zeroCounter.textContent = localStorage.getItem("zeroCount");
}
if (localStorage.getItem("powerCount")) {
  powerCounter.textContent = localStorage.getItem("powerCount");
}

// Update progress bar on load
const progressBar = document.getElementById("progressBar");
const percentage = Math.round((count / maxCount) * 100) + "%";
progressBar.style.width = percentage;

// Show congrats message on load if attendee goal reached
const greeting = document.getElementById("greeting");
if (count === maxCount) {
  const waterCount = parseInt(waterCounter.textContent);
  const zeroCount = parseInt(zeroCounter.textContent);
  const powerCount = parseInt(powerCounter.textContent);
  const maxTeamCount = Math.max(waterCount, zeroCount, powerCount);
  let tiedTeams = [];
  if (waterCount === maxTeamCount) {
    tiedTeams.push("Water Wise");
  }
  if (zeroCount === maxTeamCount) {
    tiedTeams.push("Net Zero");
  }
  if (powerCount === maxTeamCount) {
    tiedTeams.push("Renewables");
  }
  if (tiedTeams.length === 1) {
    greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> Team ${tiedTeams[0]} has won, with ${maxTeamCount} members present!`;
  } else if (tiedTeams.length === 2) {
    greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> Teams ${tiedTeams[0]} and ${tiedTeams[1]} have tied, with ${maxTeamCount} members present!`;
  } else {
    greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> All teams have tied, with ${maxTeamCount} members present!`;
  }
  greeting.classList.add("success-message");
  greeting.style.display = "block";
}

// handle form submission

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // get form values
  let name = nameInput.value;
  const team = teamSelect.value;

  // Capitalize first letter of each word in name
  name = name
    .split(" ")
    .map(function (word) {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    })
    .join(" ");

  // update attendee list in localStorage
  let attendees = [];
  if (localStorage.getItem("attendees")) {
    attendees = JSON.parse(localStorage.getItem("attendees"));
  }
  let teamLabel = "";
  if (team === "water") {
    teamLabel = "Water Wise";
  } else if (team === "zero") {
    teamLabel = "Net Zero";
  } else if (team === "power") {
    teamLabel = "Renewables";
  }
  attendees.push({ name: name, team: teamLabel });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  loadAttendeeList();

  // capitalize first letter of name
  if (name.length > 0) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  console.log(name, team);

  const greeting = document.getElementById("greeting");

  // Only allow celebration message if max count reached
  if (count === maxCount) {
    // Get team counts
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent
    );

    // Find the highest count
    const maxTeamCount = Math.max(waterCount, zeroCount, powerCount);
    let tiedTeams = [];
    if (waterCount === maxTeamCount) {
      tiedTeams.push("Water Wise");
    }
    if (zeroCount === maxTeamCount) {
      tiedTeams.push("Net Zero");
    }
    if (powerCount === maxTeamCount) {
      tiedTeams.push("Renewables");
    }

    if (tiedTeams.length === 1) {
      greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> Team ${tiedTeams[0]} has won, with ${maxTeamCount} members present!`;
    } else if (tiedTeams.length === 2) {
      greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> Teams ${tiedTeams[0]} and ${tiedTeams[1]} have tied, with ${maxTeamCount} members present!`;
    } else {
      greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> All teams have tied, with ${maxTeamCount} members present!`;
    }
    greeting.classList.add("success-message");
    greeting.style.display = "block";
    return;
  }

  // show welcome message on the page with full team name
  let teamFullName = "";
  if (team === "water") {
    teamFullName = "Water Wise";
  } else if (team === "zero") {
    teamFullName = "Net Zero";
  } else if (team === "power") {
    teamFullName = "Renewables";
  }
  const message = `🙌 Welcome, ${name}, from Team ${teamFullName}!`;
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  console.log(message);

  // increment count and update if not over max
  if (count < maxCount) {
    count++;
    console.log("Total check-ins: ", count);

    // update team counter
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

    // save counts to localStorage
    localStorage.setItem("attendeeCount", count);
    localStorage.setItem("waterCount", waterCounter.textContent);
    localStorage.setItem("zeroCount", zeroCounter.textContent);
    localStorage.setItem("powerCount", powerCounter.textContent);

    // update progress bar
    const percentage = Math.round((count / maxCount) * 100) + "%";
    console.log(`Progress: ${percentage}`);
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = percentage;

    // update total attendance counter
    totAttendees.textContent = count;

    // display a celebration message when attendee goal is reached
    if (count === maxCount) {
      greeting.innerHTML = `🎉 Attendance goal reached! 🎉<br> Team ${teamFullName} has won, with ${teamCounter.textContent} members present!`;
      greeting.classList.add("success-message");
      greeting.style.display = "block";
    }
  }

  // reset the name and team selection options
   // form.reset();
});
