// Регистрация
let btnSignup = document.querySelector('.btn-signup');

btnSignup.addEventListener('click', (e) => {
  e = document.querySelector('.signup');
  e.classList.add('signup--window');
});

// function AddFavorite(location.href, document.title) {
//   location.href = about_blog.html;
//   document.title = 'Настройки';
// }

// let elemBtn = document.querySelector('.element-button');

// elemBtn.addEventListener('click', (event) => {
//   event.preventDefault(); // Предотвращаем обновление страницы
//   window.external.AddFavorite(location.href, document.title);
// });

//  Счетчик избранного

// let count_1 = 0;
// let count_2 = count_1;

// function incrementCount() {
//   count_1++;
//   count_2++;
//   document.querySelector(".count-1").innerHTML = count_1;
//   document.querySelector(".count-2").innerHTML = count_2;
// }

// let btn = document.querySelector('.element-button');
// btn.addEventListener('click', (e) => {
//   e = document.querySelectorAll('.count');
//   e.forEach((el) => {
//     el.classList.add('count--fav');
//   });
// });

// const registerBtn = document.getElementById('registerBtn');
// registerBtn.addEventListener('click', () => {

// // Получаем данные из полей ввода формы
// const username = document.getElementById('username').value;
// const email = document.getElementById('email').value;
// const password = document.getElementById('password').value;

// // Отправляем данные на сервер с помощью AJAX-запроса
// const xhr = new XMLHttpRequest();
// xhr.open('POST', 'register.php');
// xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// xhr.onload = function() {
//   if (xhr.status === 200) {
//     // Обрабатываем ответ от сервера
//     const response = JSON.parse(xhr.responseText);
//       if (response.success) {
//         alert('Регистрация прошла успешно!');
//       } else {
//         alert('Произошла ошибка при регистрации.');
//       }
//     }
//   };
  
//   xhr.send('username=' + encodeURIComponent(username) + '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password));

// });

// function initFavs() {
//   // Handle Favorites
//   let items = document.querySelector('.element-button');
//   for (let x = 0; x < items.length; x++) {
//     let item = items[x];
//     item.addEventListener('click', (el) => {
//       el = document.querySelector('.element-svg')
//       el.target.closest('.element-button').classList.toggle('element--active');
//     });
//   }
// }

