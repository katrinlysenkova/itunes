export const radioPlayerInit = () => {

    //получить элементы из html страницы
    const radio            = document.querySelector('.radio');
    const radioCoverImg    = document.querySelector('.radio-cover__img');
    const radioHeaderBig   = document.querySelector('.radio-header__big');
    const radioNavigation  = document.querySelector('.radio-navigation');
    const radioItem        = document.querySelectorAll('.radio-item');
    const radioStop        = document.querySelector('.radio-stop');
    const radioVolume      = document.querySelector('.radio-volume');
    const radioMute        = document.querySelector('.radio-mute');

    //создаем новый объект из конструктора Audio
    const audio = new Audio();
    audio.type = 'audio/aac';

    let prevVolume = audio.volume;

    //блокируем кнопку запуск(стоп)
    radioStop.disabled = true;

    //менят иконки запуск(стоп) и добавляет(убирает) анамацию радио
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }

    //выделяет логотип выбранной радиостанции
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    //получает и меняет значение громкости
    const changeVolume = () => {
        const valueVolume = radioVolume.value;
        audio.volume = valueVolume / 100;
        audio.muted = false;
    }

    //запускаем выбранную радиостанцию
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        
        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;

        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();

    });

    //запускает или останавливает воспроизведение при клике на кнопку запуск(стоп)
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    //меняем громкость при перемещении индикатора уровня громкости
    radioVolume.addEventListener('input', changeVolume);


    //отключаем громкость при клике на иконку mute
    radioMute.addEventListener('click', () => {
        audio.muted = !audio.muted;
    });

    changeVolume();

    //останавливает воспроизведение
    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };


};
