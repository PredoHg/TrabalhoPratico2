// detalhes.js

const productTitleElement = document.getElementById('product-title');
const productPriceElement = document.getElementById('product-price');
const productDescriptionElement = document.getElementById('product-description');
const productImageElement = document.getElementById('product-image');

// Função para obter o ID do produto da URL
function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}


function getProductDetails(productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      // Atualizar os elementos HTML com as informações do produto
      productTitleElement.textContent = product.title;
      productPriceElement.textContent = `$${product.price}`;
      productDescriptionElement.textContent = product.description;
      productImageElement.src = product.image;
      productImageElement.alt = product.title;
    })
    .catch(error => {
      console.error('Erro ao obter os detalhes do produto:', error);
    });
}

// Obtém o ID do produto da URL e chama a função para obter os detalhes do produto
const productId = getProductIdFromURL();
getProductDetails(productId);
