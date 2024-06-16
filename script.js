const input = document.getElementById('donation__value');
const formValue = document.getElementById('form_value');
const formSignature = document.getElementById('form_signature');
const tabs = document.querySelectorAll('.tabs__option');
const addButtons = document.querySelectorAll('.donation__btn');
const currencySelector = document.querySelector('.currency__container');
const currencyList = document.querySelector('.currency__list');
const currencyItems = document.querySelectorAll('.currency__item');
const currencyName = document.querySelector('.currency__name');
const currencyButtons = document.querySelectorAll('.donation__btn--currency');
const arrow = document.querySelector('.currency__arrow');
const submitBtn = document.querySelector('.donation__submitBtn');
const submitBtnText = document.querySelector('.donation__submitBtn--text');

const formContent = document.querySelector('.form_content');

window.onload = () => {
  console.log('page is fully loaded');
  createForm(valueObj);
};

let currentCurrency = 'UAH';

const valueObj = {
  version: '3',
  public_key: 'sandbox_i87078030762',
  action: 'paydonate',
  amount: input.value,
  currency: currentCurrency,
  description: 'description text',
  order_id: 'order_id_1',
};

const UAHValues = [200, 500, 1000];
const USDValues = [20, 100, 300];
const EURValues = [20, 100, 300];

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (!tab.classList.contains('active')) {
      tabs.forEach((tab) => {
        tab.classList.remove('active');
      });
      tab.classList.add('active');
      if (tab.dataset.type === '1') {
        valueObj.action = 'paydonate';
        submitBtnText.textContent = 'Підтримати разово';
      } else if (tab.dataset.type === '2') {
        valueObj.action = 'subscribe';
        submitBtnText.textContent = ' Підтримати щомісячно';
      }
    }
  });
});

addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    input.value = +input.value + +btn.dataset.val;
    valueObj.amount = input.value;

    createForm(valueObj);
  });
});

function checkInput(event) {
  const input = event.target;
  let value = input.value;

  if (value.length > 1 && value[0] === '0') {
    value = value.slice(1);
  }

  value = value.replace(/\D/g, '');

  input.value = value;
  valueObj.amount = value;

  createForm(valueObj);
}

function getBaseObj(obj) {
  const base64String = btoa(JSON.stringify(obj));

  return base64String;
}

function getBaseSTR(str) {
  const base64String = btoa(str);

  return base64String;
}

currencyItems.forEach((item) => {
  item.addEventListener('click', () => {
    currentCurrency = item.textContent;
    currencyName.textContent = currentCurrency;

    if (currentCurrency === 'USD') {
      for (let i = 0; i < 3; i++) {
        addButtons[i].children[0].textContent = `+ ${USDValues[i]}`;
        addButtons[i].children[1].textContent = 'USD';
        addButtons[i].dataset.val = USDValues[i];
      }
    }

    if (currentCurrency === 'UAH') {
      for (let i = 0; i < 3; i++) {
        addButtons[i].children[0].textContent = `+ ${UAHValues[i]}`;
        addButtons[i].children[1].textContent = 'UAH';
        addButtons[i].dataset.val = UAHValues[i];
      }
    }

    if (currentCurrency === 'EUR') {
      for (let i = 0; i < 3; i++) {
        addButtons[i].children[0].textContent = `+ ${EURValues[i]}`;
        addButtons[i].children[1].textContent = 'EUR';
        addButtons[i].dataset.val = EURValues[i];
      }
    }

    valueObj.currency = currentCurrency;

    createForm(valueObj);
  });
});

currencySelector.addEventListener('click', () => {
  currencyList.classList.toggle('hidden');
  arrow.classList.toggle('active');
  currencyName.classList.toggle('active');
});

function createForm(obj) {
  fetch(
    `/getform.php?type=${obj.action}&amount=${+obj.amount}&currency=${
      obj.currency
    }`
  )
    .then((response) => response.json())
    .then((data) => {
      const { data: encodedData, signature } = data;

      formValue.value = encodedData;
      formSignature.value = signature;
      console.log('CHANGE FORM DATA');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
