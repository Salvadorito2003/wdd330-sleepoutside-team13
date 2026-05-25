const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
// load header and footer and insert into page without needing to repeat code in every page
// this is the use of a template, but instead of using it to create HTML for products, we are using it to load the header and footer into the page
// this method is called ajax templating, and it is a common use of templates to load repeated elements like headers and footers into pages without needing to repeat code in every page
export default class ProductData {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    
    const data = await convertToJson(response);

    return data.Result;
  }
}
