const get = (element) => {
  return document.getElementById(element);
};

const musicContainer = get("musicContainer"),
  title = get("title"),
  progressContainer = get("progressContainer"),
  progress = get("progress"),
  audio = get("audio"),
  cover = get("cover"),
  prev = get("prev"),
  next = get("next"),
  play = get("play");

// Sing Titles
const songs = ["EnIniyaThanimaye", "EnjoyEnjaami", "ThattaanThattaan"];

// Keep track of songs
let songIndex = 2;

// Initially load the song details to DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `audios/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

function pauseSong() {
  audio.pause();
  play.innerHTML = '<i class="fas fa-play"></i>';
}

function playSong() {
  play.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong(songs[songIndex]);
  if (musicContainer.classList.contains("play")) {
    audio.play();
  }
}

function nextSong() {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong(songs[songIndex]);
  if (musicContainer.classList.contains("play")) {
    audio.play();
  }
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  const audioTimestame = (clickX / width) * duration;
  audio.currentTime = audioTimestame;
}

// Event listeners
play.addEventListener("click", () => {
  if (musicContainer.classList.contains("play")) {
    pauseSong();
  } else {
    playSong();
  }

  musicContainer.classList.toggle("play");
});

prev.addEventListener("click", prevSong);

next.addEventListener("click", nextSong);

// Time progress update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);
