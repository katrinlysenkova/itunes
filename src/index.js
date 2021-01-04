import { videoPlayerInit } from './module/videoPlayer.js';
import { radioPlayerInit } from './module/radioPlayer.js';
import { musicPlayerInit } from './module/musicPlayer.js';

//получить элементы из html страницы
const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

//скрывает блоки и деактивирует соответствующую кнопку
const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));

    //останавливает воспроизведение при переключении вкладок
    radioPlayerInit.stop();
    videoPlayerInit.stop();
    musicPlayerInit.stop();
};

//отображаем блок при клике на соответствующую кнопку
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
}));

//вызов функции
videoPlayerInit();
radioPlayerInit();
musicPlayerInit();
