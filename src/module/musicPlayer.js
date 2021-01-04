import { addZero } from './supScript.js';

export const musicPlayerInit = () => {

    //получить элементы из html страницы
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const audioVolume      = document.querySelector('.audio-volume');
    const audioMute        = document.querySelector('.audio-mute');

    //записываем названия файлов в массив
    const playlist = ['hello', 'flow', 'speed'];

    //индекс текущего трека
    let trackIndex = 0;

    //переключает треки
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    //переключает на предыдущий трек
    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    //переключает на следующий трек
    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    //получает и меняет значение громкости
    const changeVolume = () => {
        const valueVolume = audioVolume.value;
        audioPlayer.volume = valueVolume / 100;
        audioPlayer.muted = false;
    }

    //запуск и переключение плеера
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }

        const track = playlist[trackIndex];
        audioHeader.textContent = track.toUpperCase();

        //переключаем трек при клике на кнопку предыдущий
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        //переключаем трек при клике на кнопку следующий
        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    //автоматическое переключение на следующий трек после окончания предыдущего
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });


    //отображение текущей позиции воспроизведения трека
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutePassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';

        const minuteTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`
    });

    //меняем текущую позицию вопроизведения при перемещении индикатора воспроизведения трека
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    //меняем громкость при перемещении индикатора уровня громкости
    audioVolume.addEventListener('input', changeVolume);

    //отключаем громкость при клике на иконку mute
    audioMute.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted;
    });
    
    changeVolume();

    //останавливает воспроизведение
    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
        audioPlayer.pause();
        audio.classList.remove('play');
        audioButtonPlay.classList.add('fa-play'); 
        audioButtonPlay.classList.remove('fa-pause');
    }
};

};