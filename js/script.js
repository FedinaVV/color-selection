/**
 *Выбор всех колонок на странице
 */
const cols = document.querySelectorAll('.col');

/**
 *Генерация рандомных символов в шестнадцатеричной системе
 */

function generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color;
}

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        const node =
            event.target.tagName.toLowerCase() === 'i'
                ? event.target
                : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    } else if (type === 'copy') {
        copyToClick(event.target.textContent);
    }
})

/**
 * Получение рандомных цветов при клике на кнопку Choose colors
 */

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const title = col.querySelector('.title');
        const btn = col.querySelector('.btn');

        const colorRandom = isInitial
            ? colors[index]
                ? colors[index]
                : generateRandomColor()
            : generateRandomColor();

        if (isLocked) {
            colors.push(title.textContent);
            return
        }

        if (!isInitial) {
            colors.push(colorRandom);
        }

        title.textContent = colorRandom;
        col.style.background = colorRandom;

        setTextColor(title, colorRandom);
        setTextColor(btn, colorRandom);
    })

    updateColorsHash(colors);
}

/**
 *
 * @param text элемент, у которого будет изменяться цвет текста
 * @param color рандомно-генерируемый цвет
 */

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

/**
 * Функция копирования цвета при клике на название цвета
 */

function copyToClick(text) {
    return navigator.clipboard.writeText(text);
}

/***
 *
 * @param colors массив цветов, которые сохраняются в document.location.hash
 */

function updateColorsHash(colors = []) {
    document.location.hash = colors
        .map((col) => col.toString().substring(1)).join('-')
}

/**
 *Вернуть список выбранных цветов в массиве
 */

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map(color => '#' + color);
    }
    return []
}

setRandomColors(true);