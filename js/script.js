const $giveMoney = document.querySelector('#giveMoney');
const $getMoney = document.querySelector('#getMoney');
const $buttonChange = document.querySelector('.button-change');
const $giveCurrency = document.querySelector('#giveCurrency');
const $getCurrency = document.querySelector('#getCurrency');


const $modal = document.querySelector('#myModal');
const $close = document.querySelector('.close');
const $buttonModalChange = document.querySelector('.button-modal-change');
const $buttonCancel = document.querySelector('.button-cancel');
const $wallet = document.querySelector('.wallet');
const $name = document.querySelector('.name');
const $surname = document.querySelector('.surname');
const $modalTitle = document.querySelector('.modal-title');
const $modalText = document.querySelectorAll('.modal-text');

//курсы валют
const currency = {
    EUR: {
        title: 'Евро',
        USD: 1.21,
        RUB: 90.29,
        MLD: 21.39,
        RUP: 19.45,
        UAH: 33.53,
        EUR: 1,
    },

    USD: {
        title: 'Доллар США',
        RUB: 74.36,
        EUR: 0.82,
        MLD: 17.80,
        RUP: 16.5,
        UAH: 27.9,
        USD: 1,
    },

    RUB: {
        title: 'Рубль РФ',
        USD: 0.011,
        EUR: 0.013,
        MLD: 0.24,
        RUP: 0.2145,
        UAH: 0.37,
        RUB: 1,
    },
    MLD: {
        title: 'Молдавский лей',
        USD: 0.011,
        EUR: 0.013,
        RUB: 4.26,
        RUP: 0.92,
        UAH: 1.58,
        MLD: 1,
    },
    UAH: {
        title: 'Украинская гривна',
        USD: 0.06,
        EUR: 0.05,
        RUB: 2.7,
        MLD: 0.64,
        RUP: 0.72,
        UAH: 1,
    },
    RUP: {
        title: 'Приднестровский рубль',
        USD: 0.036,
        EUR: 0.03,
        RUB: 4.66,
        MLD: 1.13,
        UAH: 1.21,
        RUP: 1,
    },
}

const commission = 0.005;

//добавляем опции к селектам items - что добавляем, options - куда
const addOptions = (items, options) => {
    Object.entries(items).forEach(([key, value]) => options.insertAdjacentHTML('beforeend', `<option value="${key}" title="${value.title}">${key}</option> `));
};

//открывается модальное окно
$buttonChange.addEventListener('click', () => {
    if (getMoney.value) {
        $modal.style.display = "block";
        $modalTitle.innerHTML = `Вы меняете ${$giveMoney.value} ${$giveCurrency.value} на ${$getMoney.value} ${$getCurrency.value}`;
    }
});

//закрытие модалки
window.addEventListener('click', (event) => {
    if (event.target == $modal || event.target == $close || event.target == $buttonCancel) {
        $modal.style.display = "none";
    }
    if (event.target == $buttonModalChange) {
        if ($wallet.value && $name.value && $surname.value) {
            alert('Обмен произведен!');
            $giveMoney.value = '';
            $getMoney.value = '';
            $modal.style.display = "none";
        } else {
            $modalText.forEach(item => item.style.color = "red");
        }

    }
});

//обмен валюты: сумма, валютаИЗ, валютаВ, комиссия
const changeMoney = (giveMoney, giveCurrency, getCurrency, commission) => {
    if (giveMoney) {
        return (giveMoney * currency[giveCurrency][getCurrency] * commission).toFixed(2);
    } else {
        return '';

    }
}


//заполняем валюты из курсов валют
addOptions(currency, $giveCurrency);
addOptions(currency, $getCurrency);

//пересчет при вводе суммы в вы отдаете
$giveMoney.addEventListener('input', () => {
    $getMoney.value = changeMoney($giveMoney.value, $giveCurrency.value, $getCurrency.value, (1 - commission))
});
//пересчет при смене валют
$giveCurrency.addEventListener('input', () => {
    $getMoney.value = changeMoney($giveMoney.value, $giveCurrency.value, $getCurrency.value, (1 - commission))
});

$getCurrency.addEventListener('input', () => {
    $getMoney.value = changeMoney($giveMoney.value, $giveCurrency.value, $getCurrency.value, (1 - commission))
});
//пересчет при вводе суммы в вы получаете
$getMoney.addEventListener('input', () => {
    $giveMoney.value = changeMoney($getMoney.value, $getCurrency.value, $giveCurrency.value, (1 + commission))
});



//scroll smooth - плавная прокрутка

{
    const scrollLinks = document.querySelectorAll('button.scroll-link');

    for (const scrollLink of scrollLinks) {
        scrollLink.addEventListener('click', event => {
            event.preventDefault();
            const id = scrollLink.getAttribute('href');
            setTimeout(1000, document.querySelector(id).scrollIntoView({
                behavior: 'smooth', //плавная
                block: 'start', //до какого момента крутить
            }))
        });
    }
}