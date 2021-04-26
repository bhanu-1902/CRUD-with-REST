document.getElementById("delete").onclick = function (evt) {
  evt.preventDefault();
  const productId = document.getElementById("product-id").value;
  axios.delete(`/api/products/${productId}`).then(processResults);
};

function processResult() {
  window.alert("Product deleted!");
}
