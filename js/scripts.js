/* есть цикл Фор. задаём переменную. через ; ставим условие-пока i меньше нашего названия, цикл будет запускаться. 
length это количество кнопок (длина массива. у нас 3)
for (let i = 0; i < trailersButtons.length; i++) {
    const element = trailersButtons[i];
    console.log('element: ', element);
} */

const createListTrailers = (parent, srcList) => {
    const trailersList = document.createElement('ul');
    trailersList.classList.add('trailers__list');
    parent.append(trailersList);

    const trailerWrappers = [];
    const trailerFrames = [];
    
    srcList.forEach((src) => {
        const trailersItem = document.createElement('li');
        trailersItem.classList.add('trailers__item');
        trailersList.append(trailersItem);

        const trailersWrapper = document.createElement('div');
        trailersWrapper.classList.add('trailers__wrapper');
        trailersItem.append(trailersWrapper);
        trailerWrappers.push(trailersWrapper);

        const trailersVideo = document.createElement('iframe');
        trailersVideo.classList.add('trailers__video');
        trailersWrapper.append(trailersVideo);
        trailerFrames.push(trailersVideo);

        const idVideo = src.match(/\/embed\/([^/\?]+)/)[1]
        console.log('idVideo: ', idVideo);

        trailersVideo.srcdoc = `
        <style>
        * {
        padding: 0;
        margin: 0;
        overflow: hidden;
        }
        html, body {
            width: 100%;
            height: 100%;
        }
        img, svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        a {
            cursor: default;
        }
        #button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
            width: 64px;
            height: 64px;
            border: none;
            background-color: transparent;
            cursor: pointer;
        }
        @media (max-width: 900px) {
            #button {
                width: 36px;
                height: 36px;
            }
        }
        </style>
        <a href="https://www.youtube.com/embed/${idVideo}?autoplay=1">
            <img src="https://img.youtube.com/vi/${idVideo}/maxresdefault.jpg">
            <div id="button">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="32" fill="#FF3D00"/><path d="M42.5 31.134C43.1667 31.5189 43.1667 32.4811 42.5 32.866L27.5 41.5263C26.8333 41.9112 26 41.4301 26 40.6603V23.3397C26 22.5699 26.8333 22.0888 27.5 22.4737L42.5 31.134Z" fill="white"/></svg>
            </div>
        </a>
        `;
        console.dir(trailersVideo);
    });

    return {trailerWrappers, trailerFrames}
};
const controlTrailer = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
    if (i !== j) {
        trailerWrappers[i].style.display = 'none';
        trailerFrames[i].srcdoc = '';
    } else {
        trailerWrappers[i].style.display = 'block';
        trailerFrames[i].srcdoc = trailerFrames[i].dataset.srcdoc;
    }
}

const init = () => {
    const trailersContainer = document.querySelector('.trailers__container');
    const trailersButtons = document.querySelectorAll('.trailers__button');

    const srcList = [];

    trailersButtons.forEach((btn) => {
        srcList.push(btn.dataset.src);
    });
    const { trailerWrappers, trailerFrames } = createListTrailers(
        trailersContainer, 
        srcList,
    );

    /* метод запускает колбэк функцию, запустит столько раз, сколько кнопок */
    trailersButtons.forEach((btn, j) => {
        trailerFrames[j].dataset.srcdoc = trailerFrames[j].srcdoc;
        btn.addEventListener('click', () => {
            trailersButtons.forEach((tBtn, i) => {
                if (tBtn === btn) {
                    tBtn.classList.add('trailers__button_active');
                } else {
                    tBtn.classList.remove('trailers__button_active');
                }

                controlTrailer(trailerWrappers, trailerFrames, i, j);
            });
        });
    });

    controlTrailer(trailerWrappers, trailerFrames)
};
init();


