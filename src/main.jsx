import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css"

const div = document.getElementById("root")

createRoot(div).render(<App/>);