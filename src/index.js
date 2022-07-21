import React from "react";
import ReactDOM from "react-dom/client";

import { ListItemDisplay } from "route/list-item-display/ListItemDisplay";

import 'index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ListItemDisplay />
    </React.StrictMode>
);
