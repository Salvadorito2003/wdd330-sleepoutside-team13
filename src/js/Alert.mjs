export default class Alert {
  constructor() {
    this.alerts = [];
  }

  async init() {
    try {
      const response = await fetch("/json/alert.json");  
      this.alerts = await response.json();
      this.render();
    } catch (err) {
      console.log("No alerts to display", err);
    }
  }

  render() {
    if (!this.alerts || this.alerts.length === 0) return;

    const alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "alert-close";
    closeBtn.innerHTML = "&times;";
    closeBtn.setAttribute("aria-label", "Close alerts");
    closeBtn.onclick = () => alertSection.remove();
    alertSection.appendChild(closeBtn);

    // Marquee track container
    const marqueeTrack = document.createElement("div");
    marqueeTrack.className = "marquee-track";

    // Build content from alerts
    let contentHTML = "";
    this.alerts.forEach(alert => {
      contentHTML += `<span class="alert-item" style="background-color:${alert.background};color:${alert.color}">${alert.message}</span>`;
    });

    // Duplicate for seamless loop
    marqueeTrack.innerHTML = contentHTML + contentHTML;

    alertSection.appendChild(marqueeTrack);

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertSection);
    }
  }
}