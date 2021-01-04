import { addZero } from './supScript.js';

export const videoPlayerInit = () => {

    //получить элементы из html страницы
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const volumeDown = document.querySelector('.volume-down');
    const volumeUp = document.querySelector('.volume-up');
    const videoFullscreen  = document.querySelector('.video-fullscreen');

    let tempVolume = videoPlayer.volume;

    //переход в полноэкранный режим при клике на иконку
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    //отображаем элементы управления плеера в полноэкранном режиме в Mozilla Firefox
    videoPlayer.addEventListener('fullscreenchange', () => {
        if (document.fullscreen) {
            videoPlayer.controls = true;
        } else {
            videoPlayer.controls = false;
        }
    });

    //меняет иконки паузы и воспроизведения
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.add('fa-play');
            videoButtonPlay.classList.remove('fa-pause');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    }

    //запускает или останавливает плеер
    const togglePlay = event => {
        event.preventDefault()
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    //останавливает плеер и перемещает позицию воспроизведения в начало
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    //получает и меняет значение громкости
    const changeValue = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;
    };

    //запускаем или останавлиавем плеер при клике
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    //меняем иконки паузы и воспроизведения
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    //останавливеам плеер при клике на кнопку стоп
    videoButtonStop.addEventListener('click', stopPlay);

    //отображаем текущую позицию вопроизведения и всю продолжительность видео
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        //меняем положение индикатора воспроизведения видео
        videoProgress.value = (currentTime / duration) * 100;

        //получаем текущую позицию вопроизведения в минутах и секундах
        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        //получаем всю продолжительность видео в минутах и секундах
        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);
    
        //присваиваем элементам полученные значения времени
        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    //меняем текущую позицию вопроизведения при перемещении индикатора воспроизведения видео
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    //меняем громкость при перемещении индикатора уровня громкости
    videoVolume.addEventListener('input', changeValue);

    //устанавливаем громкость при переходе в, из полноэкранного режима
    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = Math.round(videoPlayer.volume * 100);
    });
    
    changeValue();
    
    //максимальная громкость при клике на иконку
    volumeUp.addEventListener('click', () => {
        if (videoPlayer.volume !== 1) {
            tempVolume = videoPlayer.volume;
            videoPlayer.volume = 1;
        } else {
            videoPlayer.volume = tempVolume;
        }
    });
    
    //минимальная громкость при клике на иконку
    volumeDown.addEventListener('click', () => {
        if (videoPlayer.volume) {
            tempVolume = videoPlayer.volume;
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = tempVolume;
        }
    });
    
    //останавливает воспроизведение
    videoPlayerInit.stop = () => {
        videoPlayer.pause();
        toggleIcon();
    };
};