const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const pomodoroEl=document.getElementById("pomodoro");
const shortbreakEl = document.getElementById("short-break");
const longbreakEl=document.getElementById("long-break");

//user inputs
let pomodoroTime;
let shortBreakTime;
let longBreakTime;
let timeLeft;
let interval;
let timerMode;


pomodoroUserInput();

function pomodoroUserInput(){
    pomodoroTime = parseInt(prompt("Please enter pomodoro time (minutes)"));

    if(isInteger(pomodoroTime)){
        pomodoroTimer(pomodoroTime);
        pomodoroEl.addEventListener("click", () => pomodoroTimer(pomodoroTime));
        shortbreakUserInput();
    }
    else{
        pomodoroUserInput();
    }
}

function shortbreakUserInput(){
    shortBreakTime = parseInt(prompt("Please enter shortbreak time (minutes)"));

    if(isInteger(shortBreakTime)){
        shortbreakEl.addEventListener("click", () => shortbreakTimer(shortBreakTime));
        longbreakUserInput();
    }
    else{
        shortbreakUserInput();
    }
}

function longbreakUserInput(){
    longBreakTime = parseInt(prompt("Please enter long break time (minutes)"));

    if(isInteger(longBreakTime)){
        longbreakEl.addEventListener("click", () => longbreakTimer(longBreakTime));
        timerMode = "pomodoro";
    }
    else{
        longbreakUserInput();
    }
}

function isInteger(value){
    return typeof value === 'number' && Number.isInteger(value);
}

function updateTimer(){
    let minutes=Math.floor(timeLeft/60); //sec to mins
    let seconds=timeLeft%60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    timerEl.innerHTML = formattedTime;  //dynamic html
}

function startTimer() {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!");
            resetTimer();  // reset the timer based on the current mode
            updateTimer(); // update the timer after resetting
        }
    }, 1000); // every second, time left is triggered
}

function resetTimer() {
    switch (timerMode) {
        case "pomodoro":
            timeLeft = pomodoroTime * 60;
            clearInterval(interval); //doesnt start when resetting
            break;
        case "shortBreak":
            timeLeft = shortBreakTime * 60;
            clearInterval(interval);
            break;
        case "longBreak":
            timeLeft = longBreakTime * 60;
            clearInterval(interval);
            break;
    }
}

function stopTimer(){
    clearInterval(interval);
}

function clearIntervalAndReset(){
    clearInterval(interval);
    resetTimer();
    updateTimer();
}


function pomodoroTimer(a){
    timeLeft = a*60; //DONT CHANGE FUNCTION
    updateTimer();
    timerMode="pomodoro";
}

function shortbreakTimer(b){
    timeLeft = b*60;
    updateTimer();
    timerMode = "shortBreak";

}

function longbreakTimer(c){
    timeLeft = c*60;
    updateTimer();
    timerMode = "longBreak";
}



startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", clearIntervalAndReset);

//music player

const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("song-title");

//song titles
const songs = ['Creme\'s Interlude-PinkSiifu', 'Florida-Dominic Fike', 'Comme Des Garcons-Frank Ocean'];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
}

function playSong(){
musicContainer.classList.add('play');
playBtn.querySelector('i.fas').classList.remove('fa-play');
playBtn.querySelector('i.fas').classList.add('fa-pause');
audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong(); 
}

function nextSong(){
    songIndex++;

    if (songIndex > songs.length-1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);


audio.addEventListener('ended', nextSong);


//modal schtuff
const modal = document.getElementById("modal");
const openModal = document.getElementById("notes");
const closeModal = document.getElementById("close-button");

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

