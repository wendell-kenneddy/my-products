export const buildProductsHtml = products => {
  let html = '';

  for (const [id, product] of products) {
    const li = `
      <li>
        <div class="product-info">
          <span class="product-name">${product.name}</span>
          <span class="product-description">${product.description}</span>
        </div>

        <div class="actions">
          <a href="#" title="Excluir produto" class="delete-product" data-id="${id}">
            <img
              src="/assets/images/trash.svg"
              alt="Lixeira"
              width="24"
              height="24"
            />
          </a>
        </div>
      </li>
    `;

    html += li;
  }

  return html;
};

export const setupProducts = (productsHtml, unlogged = true) => {
  const productsContainer = document.querySelector('ul.product-list');

  if (!productsHtml && unlogged == true) {
    productsContainer.innerHTML = '<p>Faça login para ver seus produtos.</p>';
    return;
  }

  if (!productsHtml && unlogged == false) {
    productsContainer.innerHTML =
      '<p>Parece que você ainda não adicionou nada...</p>';
    return;
  }

  productsContainer.innerHTML = productsHtml;
};
