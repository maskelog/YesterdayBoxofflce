import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import MovieList from "./MovieList";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
