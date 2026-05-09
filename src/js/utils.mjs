// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage and updated to work with arrays of data instead of just one item
export function setLocalStorage(key, data) {
  let existing = JSON.parse(localStorage.getItem(key));
  
  if (!Array.isArray(existing)) {
    existing = [];
  }
  
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
