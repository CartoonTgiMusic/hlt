let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let track_writer = document.querySelector('.track-writer');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let loopIcon = document.querySelector('.fa-repeat');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let isLoop = false;
let updateTimer;

const music_list = [
    {
        img : 'assets/images/hlhimgs/cover1.jpg',
        name : 'အွဥ်ႏဖိင်ꩻတꩻလꩻတဝ်း',
        artist : 'ခွန်ပဒဲကော',
        writer :'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/hlhaudios/music1.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover2.jpg',
        name : 'သဲင်ꩻလွဥ်ချာခမ်းမွိုင်',
        artist : 'ခွန်ခွန်ကျော်ဦး',
        writer :'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/hlhaudios/music2.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover3.jpg',
        name : 'ထွူလဲဥ်း',
        artist : 'ခွန်ကျော်စိုး',
        writer :'တဲမ်း-ခွန်ကျော်စိုး',
        music : 'assets/musics/hlhaudios/music3.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover4.jpg',
        name : 'ခံႏလွို့အသွုမ်',
        artist : 'ခွန်အောင်သိုက်',
        writer :'တဲမ်း-ခွန်အောင်သိုက်',
        music : 'assets/musics/hlhaudios/music4.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover5.jpg',
        name : 'ထောင်လွေꩻထဲင်း',
        artist : 'ခွန်တကီးတဘဲ',
        writer :'တဲမ်း-ခွန်တကီးတဘဲ',
        music : 'assets/musics/hlhaudios/music5.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover6.jpg',
        name : 'ဆွိုးခန်းမွိုင်',
        artist : 'ကာတွန်းစွိုꩻ',
        writer :'တဲမ်း-ခွန်တကီးတဘဲ',
        music : 'assets/musics/hlhaudios/music6.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover7.jpg',
        name : 'ယူးတွမ်ႏညော်ႏ',
        artist : 'ခွန်ပဒဲကော',
        writer :'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/hlhaudios/music7.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover8.jpg',
        name : 'နာꩻဖေႏကသေ',
        artist : 'ခွန်ကျော်စိုး',
        writer :'တဲမ်း-ခွန်ပဒဲကော',
        music : 'assets/musics/hlhaudios/music8.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover9.jpg',
        name : 'အွဥ်ႏဖိင်ꩻ',
        artist : 'ခွန်အောင်သိုက်',
        writer :'တဲမ်း-ခွန်အောင်သိုက်',
        music : 'assets/musics/hlhaudios/music9.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover10.jpg',
        name : 'နီမွိုးပနမ်',
        artist : 'ခွန်ခွန်ကျော်ဦး',
        writer :'တဲမ်း-ခွန်ခွန်ကျော်ဦး',
        music : 'assets/musics/hlhaudios/music10.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover11.jpg',
        name : 'အတ္တ',
        artist : 'ခွန်တကီးတဘဲ',
        writer :'တဲမ်း-ခွန်တကီးတဘဲ',
        music : 'assets/musics/hlhaudios/music11.mp3'
    },
    {
        img : 'assets/images/hlhimgs/cover12.jpg',
        name : 'လောကတရာꩻ',
        artist : 'ခွန်ခွန်ကျော်ဦး',
        writer :'တဲမ်း-ခွန်ကျော်ခမ်း',
        music : 'assets/musics/hlhaudios/music12.mp3'
    },
];
    
    
    
    

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    track_writer.textContent = music_list[track_index].writer;
    

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
   
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    pauseLoop();
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function playLoop(){
    isLoop = true;
    loopIcon.classList.add('loopActive')
}
function pauseLoop(){
    isLoop = false;
    loopIcon.classList.remove('loopActive')
}
function repeatTrack(){
     pauseRandom();
      if(curr_track.loop != true){
        curr_track.loop = true;
        curr_track.play();
        playLoop();
      }else {
        curr_track.loop = false;
        pauseLoop();
      }
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}