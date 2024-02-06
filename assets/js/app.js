const mwstOutput = document.querySelector('.mwst-output');
const bruttoNettoOutput = document.querySelector('.brutto-netto-output');
const form = document.querySelector('form');
const radioAufschlagen = document.querySelector('#verfahren-aufschlagen');
const radioAbziehen = document.querySelector('#verfahren-abziehen');
const inputText = document.querySelector('.input-text');
const outputText = document.querySelector('.output-text');

const changeText = () => {
  // Get Value Verfahren Aufschlagen und Abschlagen
  const verfahrenVal = document.querySelector(
    'input[name="verfahren"]:checked'
  ).value;

  // Change Text
  if (verfahrenVal === 'aufschlagen') {
    inputText.innerHTML = `<p>Nettobetrag (Preis ohne Mehrwertsteuer) in Euro<span class="red">*</span></p>`;
    outputText.textContent = 'Bruttobetrag(Endbetrag)';
  } else {
    inputText.innerHTML = `<p>Bruttobetrag (Preis inkl. Mehrwertsteuer) in Euro<span class="red">*</span></p>`;
    outputText.textContent = 'Nettobetrag';
  }
};

const calculate = (event) => {
  event.preventDefault();

  // Get Value Verfahren Aufschlagen und Abschlagen
  const verfahrenVal = document.querySelector(
    'input[name="verfahren"]:checked'
  ).value;

  // Get Mehrwertsteuersatz
  const steuersatz = document.querySelector(
    'input[name="mehrwertsteuer"]:checked'
  ).value;

  // Get User Input
  const userInputNum = Number(
    document.querySelector('input[type="number"]').value
  );

  // Calculations
  const fix19 = 1.19;
  const fix7 = 1.07;

  if (userInputNum === 0) return;

  if (verfahrenVal === 'aufschlagen' && steuersatz === '19') {
    mwstOutput.textContent = `${(userInputNum * fix19 - userInputNum).toFixed(
      2
    )} €`;
    bruttoNettoOutput.textContent = `${(userInputNum * fix19).toFixed(2)} €`;
  } else if (verfahrenVal === 'aufschlagen' && steuersatz === '7') {
    mwstOutput.textContent = `${(userInputNum * fix7 - userInputNum).toFixed(
      2
    )} €`;
    bruttoNettoOutput.textContent = `${(userInputNum * fix7).toFixed(2)} €`;
  } else if (verfahrenVal === 'abziehen' && steuersatz === '19') {
    mwstOutput.textContent = `${(userInputNum - userInputNum / fix19).toFixed(
      2
    )} €`;
    bruttoNettoOutput.textContent = `${userInputNum / fix19} €`;
  } else {
    mwstOutput.textContent = `${(userInputNum - userInputNum / fix7).toFixed(
      2
    )} €`;
    bruttoNettoOutput.textContent = `${(userInputNum / fix7).toFixed(2)} €`;
  }
};

radioAufschlagen.addEventListener('change', changeText);
radioAbziehen.addEventListener('change', changeText);
form.addEventListener('submit', calculate);
