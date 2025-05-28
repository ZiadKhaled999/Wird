import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Font preloading
const fontAmiri = new FontFace(
  "Amiri",
  "url(https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHpUrtLMA7w.woff2) format('woff2')"
);
const fontNotoSans = new FontFace(
  "Noto Sans",
  "url(https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFVZNyB.woff2) format('woff2')"
);

// Load and apply fonts
Promise.all([fontAmiri.load(), fontNotoSans.load()])
  .then(fonts => {
    fonts.forEach(font => {
      document.fonts.add(font);
    });
    
    // After fonts are loaded, render the app
    createRoot(document.getElementById("root")!).render(<App />);
  })
  .catch(error => {
    console.error("Error loading fonts:", error);
    // Render app anyway if fonts fail to load
    createRoot(document.getElementById("root")!).render(<App />);
  });
