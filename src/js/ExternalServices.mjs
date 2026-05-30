// Get the API base URL from the Vite environment variables
const baseURL = import.meta.env.VITE_SERVER_URL;

// Helper function to convert a fetch response into JSON
// and handle any server errors consistently
async function convertToJson(res) {
  const jsonResponse = await res.json();

  // If the request was successful, return the JSON data
  if (res.ok) {
    return jsonResponse;
  } else {
    // Otherwise throw a custom error object
    throw { name: "servicesError", message: jsonResponse };
  }
}

// Class responsible for communicating with the external API
export default class ExternalServices {
  constructor() {}

  // Fetch all products in a specific category
  // Example: tents, backpacks, hammocks
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);

    // Return only the Result array from the API response
    return data.Result;
  }

  // Fetch details for a single product using its ID
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    // Return the product object
    return data.Result;
  }

  // Send checkout/order information to the server
  async checkout(order) {
    // Configure the POST request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // Convert the order object into JSON before sending
      body: JSON.stringify(order)
    };

    // Send the order to the checkout endpoint
    const response = await fetch(`${baseURL}checkout`, options);

    // Return the server response
    return await convertToJson(response);
  }
}