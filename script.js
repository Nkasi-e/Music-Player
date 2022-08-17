//Const for properties we want to create/get with our javascript
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Const for progress Bar
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

// Const for populating the current time
const currentTimeEle = document.getElementById('current-time');
const durationEle = document.getElementById('duration');

// Const for properties created in our html document
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Creating Music Libary with and array method
const songs = [
    {
        name: 'nkasi-1',
        displayName: 'Electric Chill Machine',
        artist: 'Nkasi',
    },
    {
        name: 'nkasi-2',
        displayName: 'The Chill groove',
        artist: 'Bethel',
    },
    {
        name: 'nkasi-3',
        displayName: 'The groove move',
        artist: 'Jrunz',
    },
    {
        name: 'metric',
        displayName: 'Metric Move',
        artist: 'Boy Kuls',
    },
];

//Check if Playing
let isPlaying = false;

//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause'); //to change the title when playing
    music.play();
}
//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play'); // to chanfe the title when paused
    music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//creating a function that will Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
    songIndex--;
    //The if condition makes the songs to play the last on the list that's if it's been clicked and theres no previous song
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
// Next Song
function nextSong() {
    songIndex++;
    //The if condition makes the songs to play the first on the list that's if it's been clicked and theres no next song
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//On Load - Select First Song
loadSong(songs[songIndex]);

//Progress bar function
function updateProgressBar(e) {
    if (isPlaying) {
        // Using destructuring we have
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        // For the seconds
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching the duration element to avoid NaN
        if (durationSeconds) {
            durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
        }
         // Calculate display for Current time
         const currentMinutes = Math.floor(currentTime / 60);
         // For the seconds
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10) {
             currentSeconds = `0${currentSeconds}`;
         }
         currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
// Using destructuring
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Adding Button Event Listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
//Event Listener for progress Bar
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);




