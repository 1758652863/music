// 1. 定义播放列表数据 (对应你的 mp3 和 img 文件夹素材)
const playlist = [
    { title: "歌曲一", artist: "未知歌手", src: "./mp3/music0.mp3", cover: "./img/record0.jpg", bg: "./img/bg0.png" },
    { title: "歌曲二", artist: "未知歌手", src: "./mp3/music1.mp3", cover: "./img/record1.jpg", bg: "./img/bg1.png" },
    { title: "歌曲三", artist: "未知歌手", src: "./mp3/music2.mp3", cover: "./img/record2.jpg", bg: "./img/bg2.png" },
    { title: "歌曲四", artist: "未知歌手", src: "./mp3/music3.mp3", cover: "./img/record3.jpg", bg: "./img/bg3.png" }
];

let currentIndex = 0; // 当前播放歌曲的索引

// 获取DOM元素
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('btn-play');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const record = document.getElementById('record');
const coverImg = document.getElementById('cover-img');
const bgLayer = document.getElementById('bg-layer');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');

// 2. 初始化加载歌曲信息
function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songTitle.innerText = song.title;
    songArtist.innerText = `歌手：${song.artist}`;
    coverImg.src = song.cover;
    bgLayer.style.backgroundImage = `url('${song.bg}')`;
    
    // 每次切歌重置进度条
    progressBar.value = 0;
    currentTimeDisplay.innerText = "00:00";
}

// 3. 播放与暂停控制
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.src = "./img/暂停.png"; // 切换为暂停图标
        record.classList.add('playing'); // 开启唱片旋转
    } else {
        audio.pause();
        playBtn.src = "./img/继续播放.png"; // 切换为播放图标
        record.classList.remove('playing'); // 停止唱片旋转
    }
}

// 4. 上一曲 / 下一曲
function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
    if (!audio.paused) audio.play(); // 如果之前在播放，切歌后继续播放
}

function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
    if (!audio.paused) audio.play();
}

// 5. 进度条联动与时间显示
audio.addEventListener('timeupdate', () => {
    // 更新进度条位置
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        
        // 更新时间显示 (调用老师提供的格式化函数)
        currentTimeDisplay.innerText = transTime(audio.currentTime);
        durationDisplay.innerText = transTime(audio.duration);
    }
});

// 拖动进度条跳转播放时间
progressBar.addEventListener('input', (e) => {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// 音量控制
volumeBar.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// 歌曲播放完毕自动下一首
audio.addEventListener('ended', nextSong);

// 绑定按钮点击事件
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// 初次加载第一首歌
loadSong(currentIndex);


/* ================= 以下为素材截图中提供的播放时间换算代码 ================= */
function transTime(value) {
    var time = "";
    var h = parseInt(value / 3600);
    value %= 3600;
    var m = parseInt(value / 60);
    var s = parseInt(value % 60);
    if (h > 0) {
        time = formatTime(h + ":" + m + ":" + s);
    } else {
        time = formatTime(m + ":" + s);
    }
    return time;
}

function formatTime(value) {
    var time = "";
    var s = value.split(':');
    var i = 0;
    for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? ('0' + s[i]) : s[i];
        time += ":";
    }
    time += s[i].length == 1 ? ('0' + s[i]) : s[i];
    return time;
}