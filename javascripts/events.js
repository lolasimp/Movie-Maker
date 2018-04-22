const data = require('./data');
const printSelectionsToDom = require('./printSelections');

let allElements = [];
const selections = [];
let budgetBoxValue = '';

const getBudget = (e) => {
  const budgetBox = e.target.parentNode.children[0].children[0];
  budgetBox.setAttribute('disabled', 'disabled');

  budgetBoxValue = e.target.parentNode.children[0].children[0].value;
  budgetBoxValue = budgetBoxValue * 1;
  checkEvents();
};

const showSelections = (e) => {
  allElements = data.getElements();
  const selectedElement = e.target;
  allElements.forEach((element) => {
    if (element.id === selectedElement.id && selections.indexOf(element) === -1) {
      selections.push(element);
    };
  });
  data.setTotal(selections);
  printSelectionsToDom.printSelections(selections);
};

const checkEvents = () => {
  const checkboxes = document.getElementsByClassName('check');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].removeAttribute('disabled');
    checkboxes[i].addEventListener('click', showSelections);
  };
};

const budgetEvents = () => {
  const budgetBtn = document.getElementById('set-budget');
  budgetBtn.addEventListener('click', getBudget);
};

module.exports = {
  checkEvents,
  budgetEvents,
  budgetBoxValue,
};
