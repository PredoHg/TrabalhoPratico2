const productCatalog = document.getElementById('product-catalog');
const searchForm = document.getElementById('search-form');
const dropdown = document.getElementById('dropdown');

searchForm.addEventListener('input', function(event) {
  const searchInput = event.target.value.trim().toLowerCase();
  filterProducts(searchInput);
});

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    renderProducts(data);
  })
  .catch(error => {
    console.error('Erro ao obter os produtos:', error);
  });

function filterProducts(searchTerm) {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      const filteredProducts = data.filter(product => {
        const title = product.title.toLowerCase();
        return title.includes(searchTerm);
      });
      renderProducts(filteredProducts);
    })
    .catch(error => {
      console.error('Erro ao filtrar os produtos:', error);
    });
}

function renderProducts(products) {
  productCatalog.innerHTML = '';

  if (products.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'Nenhum produto encontrado.';
    noResultsMessage.className = 'no-results-message';
    productCatalog.appendChild(noResultsMessage);
    return;
  }

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.className = 'product-image';
    productCard.appendChild(productImage);

    const productTitle = document.createElement('h2');
    productTitle.textContent = product.title;
    productTitle.className = 'product-title';
    productCard.appendChild(productTitle);

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price}`;
    productPrice.className = 'product-price';
    productCard.appendChild(productPrice);

    const productRating = document.createElement('p');
    productRating.textContent = `Avaliação: ${product.rating.rate}/5 (${product.rating.count} avaliações)`;
    productRating.className = 'product-rating';
    productCard.appendChild(productRating);

    const productButton = document.createElement('button');
    productButton.textContent = 'Detalhes';
    productButton.className = 'product-button';
    productCard.appendChild(productButton);

    productButton.addEventListener('click', () => {
      window.location.href = 'detalhes.html?id=' + product.id;
    });

    productCatalog.appendChild(productCard);
  });
}

function renderDropdown(products) {
  dropdown.innerHTML = '';

  if (products.length === 0) {
    dropdown.style.display = 'none';
    return;
  }

  dropdown.style.display = 'block';

  products.forEach(product => {
    const dropdownItem = document.createElement('a');
    dropdownItem.href = 'detalhes.html?id=' + product.id;
    dropdownItem.textContent = product.title;
    dropdownItem.className = 'dropdown-item';
    dropdown.appendChild(dropdownItem);
  });
}
