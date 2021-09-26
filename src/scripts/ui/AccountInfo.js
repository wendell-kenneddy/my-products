export const setupAccountDetails = (bio, email) => {
  const accountDetailsContainer = document.querySelector('.account-details');
  let html = '';

  if (!bio || !email) {
    html = `
      <h2>Detalhes da Conta</h2>

      <p>Faça login para ver os detalhes da sua conta.</p>
    `;
  } else {
    html = `
    <h2>Detalhes da Conta</h2>

    <p>Logado como ${email}</p>

    <p>${bio}</p>
  `;
  }

  accountDetailsContainer.innerHTML = html;
};
