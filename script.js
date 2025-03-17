//variables
let theTime = document.getElementById('theTime');
let startTime = document.getElementById('startTime');
let stopTime = document.getElementById('stopTime');
let resetTime = document.getElementById('resetTime');
let timeStarted = document.getElementById('timeStarted');
let timeStopped = document.getElementById('timeStopped');
let elapsedTime = document.getElementById('elapsedTime');
let timerInterval;
let startTimestamp;
let elapsedSeconds = 0;
let clockRunning = false;

//initialize the clock immediately
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

//click events
startTime.addEventListener('click', StartClock);
stopTime.addEventListener('click', StopClock);
resetTime.addEventListener('click', ResetClock);

function updateCurrentTime() {
    let date = new Date();
    let cstDate = new Date(date.toLocaleString("en-US", { timeZone: "America/Chicago" }));
    theTime.innerHTML = formatTimeFancy(cstDate);
}

//starting the clock
function StartClock() {
    if (clockRunning) return;
    console.log('Start Time');
    clockRunning = true;
    startTimestamp = new Date();
    timeStarted.innerHTML = formatTimeFancy(startTimestamp);
    timerInterval = setInterval(updateElapsedTime, 1000);
    startTime.disabled = true;
    stopTime.disabled = false;
}

function updateElapsedTime() {
    elapsedSeconds++;
    let hours = Math.floor(elapsedSeconds / 3600);
    let minutes = Math.floor((elapsedSeconds % 3600) / 60);
    let seconds = elapsedSeconds % 60;
    
    elapsedTime.innerHTML = formatTimeFancy({
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });
}

//stopping the clock
function StopClock() {
    if (!clockRunning) return;
    console.log('Stop Time');
    clockRunning = false;
    clearInterval(timerInterval);
    let stopTimestamp = new Date();
    timeStopped.innerHTML = formatTimeFancy(stopTimestamp);
    startTime.disabled = false;
    stopTime.disabled = true;
}

//resetting the clock
function ResetClock() {
    console.log('Reset Time');
    clockRunning = false;
    clearInterval(timerInterval);
    elapsedSeconds = 0;
    timeStarted.innerHTML = '<span class="time-unit">0</span><span class="time-label">h</span> <span class="time-unit">0</span><span class="time-label">m</span> <span class="time-unit">0</span><span class="time-label">s</span>';
    timeStopped.innerHTML = '<span class="time-unit">0</span><span class="time-label">h</span> <span class="time-unit">0</span><span class="time-label">m</span> <span class="time-unit">0</span><span class="time-label">s</span>';
    elapsedTime.innerHTML = '<span class="time-unit">0</span><span class="time-label">h</span> <span class="time-unit">0</span><span class="time-label">m</span> <span class="time-unit">0</span><span class="time-label">s</span>';
    startTime.disabled = false;
    stopTime.disabled = false;
}

function formatTimeFancy(date) {
    let hours, minutes, seconds;
    
    if (date instanceof Date) {
        hours = date.getHours();
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    } else {
        hours = date.hours;
        minutes = date.minutes;
        seconds = date.seconds;
    }
    
    return `<span class="time-unit">${String(hours).padStart(2, '0')}</span><span class="time-label">h</span> <span class="time-unit">${String(minutes).padStart(2, '0')}</span><span class="time-label">m</span> <span class="time-unit">${String(seconds).padStart(2, '0')}</span><span class="time-label">s</span>`;
}

function calculateElapsedTime(start, stop) {
    let diff = Math.floor((stop - start) / 1000);
    let hours = Math.floor(diff / 3600);
    let minutes = Math.floor((diff % 3600) / 60);
    let seconds = diff % 60;
    
    elapsedTime.innerHTML = formatTimeFancy({
        hours: hours,
        minutes: minutes,
        seconds: seconds
    });
}