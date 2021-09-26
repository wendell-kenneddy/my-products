export const showAlert = (form, message) => {
  if (!form || !message) return;

  const h2 = form.querySelector('h2');
  const alertP = document.createElement('p');
  alertP.classList.add('alert');
  alertP.innerText = message;

  h2.insertAdjacentElement('afterend', alertP);
};

export const removeAlerts = () => {
  const alerts = Array.from(document.querySelectorAll('p.alert'));

  alerts.forEach(alert => alert.remove());
};
