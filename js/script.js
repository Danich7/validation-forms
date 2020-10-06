// Маска для телефона
let element = document.getElementById('phone');
let maskOptions = {
  mask: '+{7}(000)000-00-00',
};
let mask = new IMask(element, maskOptions);

// Переменные
let alert = document.querySelector('.info__alert');
let forms = document.querySelectorAll('.forms__text-form');
let submit = document.querySelector('.forms__submit');
let save = document.querySelector('.forms__save');
let reset = document.querySelector('.forms__reset');

// Скрипты
submit.addEventListener('click', function (e) {      // Убирает алерт при клике на отправку формы
  e.preventDefault(); 
  alert.style.display = "none";
});

reset.addEventListener('click', function() {  // После клика на резет делает другие кнопки недействительными
  save.style.opacity = '0.5';
  save.disabled = true;
  submit.style.opacity = '0.5';
  submit.disabled = true;
  alert.style.display = "none";
});

forms.forEach(function (e) {                // Активация кнопки отправки формы и сохранения при вводе текста
  e.addEventListener('input', function () {
    if (e.value !== '') {
      submit.style.opacity = '1';
      submit.disabled = false;
      save.style.opacity = '1';
      save.disabled = false;
    } else {
      submit.style.opacity = '0.5';
      submit.disabled = true;
      save.style.opacity = '0.5';
      save.disabled = true;
    };
  });
});

// Скрипт сохранения введенных данных в локальную сессию
document.addEventListener("DOMContentLoaded", function () { 
  forms.forEach(function (e) {
    // если данные значения уже записаны в sessionStorage, то вставляем их в поля формы, тем самым мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
    if (e.value === '') e.value = window.sessionStorage.getItem(e.name, e.value);
    e.addEventListener('input', function () {
      // записываем в sessionStorage данные, в качестве имени используя атрибут name поля ввода
      window.sessionStorage.setItem(e.name, e.value);
    })
  })
});

document.addEventListener("DOMContentLoaded", function () {    // При загрузке страницы делаем кнопки недействительными, показываем алерт, если есть текст (сохранение данных в сессию)
  save.style.opacity = '0.5';
  save.disabled = true;
  submit.style.opacity = '0.5';
  submit.disabled = true;
  forms.forEach(function (e) {
    if (e.value !== '') {
      alert.style.display = "block";
    };
  });
});