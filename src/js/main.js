import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.mjs";

async function init() {
  const alert = new Alert();
  await alert.init();        
  await loadHeaderFooter();  
}

init();