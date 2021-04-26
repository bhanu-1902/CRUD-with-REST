let currentProduct = null;

document.getElementById("load").onclick = function () {
  const productId = document.getElementById("product-id").value;

  axios.get(`/api/products/${productId}`).then(({ data }) => {
    currentProduct = data;
    loadProduct(data);
  });
};

document.getElementById("submit").onclick = function (evt) {

  evt.preventDefault();
  const formData = new FormData(document.querySelector("form"));

  const newData = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    description: formData.get("description"),
    color: formData.get("color")
  };

  const updatedFields = _.omitBy(newData, function (v, k) {

    return k === "id" || currentProduct[k] == v;
  });

  axios.patch(`/api/products/${currentProduct.id}`, updatedFields).then(processResults);
};

function loadProduct(data) {
  document.getElementsByName("name")[0].value = data.name;
  document.getElementsByName("price")[0].value = data.price;
  document.getElementsByName("quantity")[0].value = data.quantity;
  document.getElementsByName("color")[0].value = data.color;
  document.getElementsByName("description")[0].value = data.description;
}

function processResults({ data }) {
  document.querySelector("form").reset();
  window.alert(`Product ${data.id} updated!`);
}
