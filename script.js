console.log("Welcome to iTunes")

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');

let masterPlay = document.getElementById('masterPlay'); 
let myProgressBar = document.getElementById('myProgressBar'); 
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName: "Jab tak", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    {songName: "Raataan Lambiyan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    {songName: "Zindagi kuch toh bata", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    {songName: "Phir Kabhi", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    {songName: "Tumhi Ho Bandhu", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    {songName: "Something Just Like This", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    {songName: "Sooraj Dooba hai", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    {songName: "Mast Magan", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    {songName: "Alone II", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    {songName: "Tu Chahiye", filePath: "songs/10.mp3", coverPath: "covers/3.jpg" },
    {songName: "Alone I", filePath: "songs/11.mp3", coverPath: "covers/9.jpg" },
    {songName: "Main Hoon Hero Tera", filePath: "songs/12.mp3", coverPath: "covers/10.jpg" },
    {songName: "Yeh ishq haye", filePath: "songs/13.mp3", coverPath: "covers/11.jpg" },
]

function getDuration(src, cb) {
    var audio = new Audio();
    audio.src = src;
    audio.onloadedmetadata = function(){
        cb(audio.duration);
    };
}


songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[1].innerText = songs[i].songName;
    

    getDuration(songs[i].filePath, function(length) {
        let minutes = Math.floor(length/60);
        let seconds = Math.floor(length - minutes*60);
        element.getElementsByClassName("timestamp")[0].innerText = `0${minutes}:${seconds}`;
    });
})



function masterPlayButtonChange_play(){
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.remove('far');
    masterPlay.classList.add('fa-pause');
    masterPlay.classList.add('fas');
}

function masterPlayButtonChange_pause(){
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.remove('fas');
    masterPlay.classList.add('fa-play-circle');
    masterPlay.classList.add('far');
}

// Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlayButtonChange_play();
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlayButtonChange_pause();
        gif.style.opacity = 0;
    }
})
// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlay = (element)=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fas');
        element.classList.remove('fa-pause');
        element.classList.add('far');
        element.classList.add('fa-play-circle');
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        let list = Array.from(e.target.classList)
        if(list.includes('fa-pause'))
        {
            // console.log('pause')
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            // audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlayButtonChange_pause();
            masterSongName.innerText = songs[songIndex].songName;
        }
        else{
            // console.log('play')
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            e.target.classList.add('fa-pause');
            gif.style.opacity = 1;
            masterPlayButtonChange_play();
            masterSongName.innerText = songs[songIndex].songName;
        }

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex > 12){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlayButtonChange_play();
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlayButtonChange_play();
    gif.style.opacity = 1;
})