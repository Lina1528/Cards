/*Popup*/
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click",function (e) {
      const popupName = popupLink.getAttribute('href').replace('#','');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.popup-close');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup){
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup-content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}


function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}


function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrap').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function(){
    unlock = true;
  }, timeout);
}

function bodyUnLock (){
  setTimeout (function(){
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
}



/*FORM*/
// document.addEventListener('DOMContentLoaded', function(){
let form = document.getElementById("form"),
    formInputs = document.querySelectorAll(".form-input"),
    inputEmail = document.querySelector(".input-email"),
    inputPhone = document.querySelector(".input-phone"),
    inputCheckbox = document.querySelector(".input-checkbox");


function validateEmail (email) {
  let re = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone){
  let re = /^[0-9\s]*$/;
  return re.test(String(phone));
}

form.onsubmit = function () {
  // e.preventDefault();
  let emailVal = inputEmail.value;
  let phoneVal = inputPhone.value;
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '');


  formInputs.forEach(function (input) {
    if (input.value === '') {
        input.classList.add('_error');
    } else {
      input.classList.remove('_error');
    }
  });

  if (emptyInputs.length !== 0){
    alert('Заполните, пожалуйста, форму для отправки');
    return false;
  }
 
  if(!validateEmail(emailVal)){
    alert('E-mail заполнен неверно');
    inputEmail.classList.add('_error');
    return false;
  } else {
    inputEmail.classList.remove('_error');
  }

  if (!validatePhone(phoneVal)) {
    alert('Номер телефона заполнен неверно. Заполните номер начиная с цифры 8');
    inputPhone.classList.add('_error');
    return false;
  } else {
    inputPhone.classList.remove('_error');
  }

  if(!inputCheckbox.checked){
    alert('Отметьте галочку о согласии на обработку данных');
    inputCheckbox.classList.add('_error');
    return false;
  } else {
    inputCheckbox.classList.remove('_error');
  }
  // return false;


  // $.ajax({
  //   url: 'mail.php',
  //   type: 'POST',
  //   cache: false,
  //   data: {
  //     ''
  //   }

  // })







}


// });





// "use strict"

// document.addEventListener('DOMContentLoaded', function(){
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);

//     async function formSend(e) {
//         e.preventDefault();

//         let error = formValidate(form);

//         if (error === 0){}
//         else { 
//             alert ('Заполните обязательные поля')
//         }
//     }

// function formValidate(form){
//     let error = 0;
//     let formReq = document.querySelectorAll('._req')

//     for(let index = 0; index < formReq.length; index++){
//         const input = formReq[index];
//         formRemoveError(input);

//         if (input.classList.contains('_email')){
//             if (emailTest(input)){
//                 formAddError(input);
//                 error++;
//             }
//         } else if(input.getAttribute("type") === "checkbox" && input.checked === false){
//             formAddError(input);
//             error++;
//         } else {
//             if (input.value === ''){
//             formAddError(input);
//             error++;
//             }
//         }
//     }
//     return error;
// }

// function formAddError(input) {
//     input.parentElement.classList.add('_error');
//     input.classList.add('_error');
// }
// function formRemoveError(input) {
//     input.parentElement.classList.remove('_error');
//     input.classList.remove('_error');
// }

// // Тест E-mail
// function emailTest(input){
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
// }


// });






/*Добавление товара в корзину*/




// Подсчет стоимости товаров в корзине
function calcCartPrice() {
	const cartWrapper = document.querySelector('.cart-wrapper');
	const priceElements = cartWrapper.querySelectorAll('.price__currency');
	const totalPriceEl = document.querySelector('.total-price');

	// Общая стоимость товаров
	let priceTotal = 0;

	// Обходим все блоки с ценами в корзине
	priceElements.forEach(function (item) {
		// Находим количество товара
		const amountEl = item.closest('.cart-item').querySelector('[data-counter]');
		// Добавляем стоимость товара в общую стоимость (кол-во * цену)
		priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
	});

	// Отображаем цену на странице
	totalPriceEl.innerText = priceTotal;
}










//Счетчики на количество товаров
// Добавляем прослушку на всем окне
window.addEventListener('click', function (event) {

  // Объявляем переменную для счетчика
  let counter;

  // Проверяем клик строго по кнопкам Плюс либо Минус
  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
  // Находим обертку счетчика
  const counterWrapper = event.target.closest('.counter-wrapper');
  // Находим див с числом счетчика
      counter = counterWrapper.querySelector('[data-counter]');
}

// Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
if (event.target.dataset.action === 'plus') {
  counter.innerText = ++counter.innerText;
}

// Проверяем является ли элемент по которому был совершен клик кнопкой Минус
if (event.target.dataset.action === 'minus') {

  // Проверяем чтобы счетчик был больше 1
  if (parseInt(counter.innerText) > 1) {
    // Изменяем текст в счетчике уменьшая его на 1
    counter.innerText = --counter.innerText;
  } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
    // Проверка на товар который находится в корзине
    console.log('IN CART!!!!');
    // Удаляем товар из корзины
    event.target.closest('.cart-item').remove();
    // Пересчет общей стоимости товаров в корзине
    calcCartPrice();
  }

}

// Проверяем клик на + или - внутри коризины
if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
  // Пересчет общей стоимости товаров в корзине
  calcCartPrice();
}
});




// Div внутри корзины, в который мы добавляем товары
const cartWrapper =  document.querySelector('.cart-wrapper');

// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
	// Проверяем что клик был совершен по кнопке "Добавить в корзину"
	if (event.target.hasAttribute('data-cart')) {

		// Находим карточку с товаром, внутри котрой был совершен клик
		const card = event.target.closest('.card');

		// Собираем данные с этого товара и записываем их в единый объект productInfo
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('.coffee').getAttribute('src'),
			title: card.querySelector('.front-title').innerText,
			price: card.querySelector('.price-card').innerText,
			counter: card.querySelector('[data-counter]').innerText,
		};

		// Проверять если ли уже такой товар в корзине
		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);


		// Если товар есть в корзине
		if (itemInCart) {
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
		} else {
			// Если товара нет в корзине

			// Собранные данные подставим в шаблон для товара в корзине
			const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus"></div>
												<div class="items__current" data-counter="">${productInfo.counter}</div>
												<div class="items__control" data-action="plus"></div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price}</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>`;

			// Отобразим товар в корзине
			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}

		// Сбрасываем счетчик добавленного товара на "1"
		card.querySelector('[data-counter]').innerText = '1';

		// Пересчет общей стоимости товаров в корзине
		calcCartPrice();

	}
});



