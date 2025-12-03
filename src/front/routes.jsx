import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import CrearUsuario from "./components/usuarios/CrearUsuario.jsx";
import Usuarios from "./components/usuarios/Usuarios";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

            <Route index element={<Home />} />
            <Route path="/single/:theId" element={<Single />} />
            <Route path="/demo" element={<Demo />} />
        
            <Route path="usuarios/crear" element={<CrearUsuario />} />
            <Route path="/usuarios" element={<Usuarios />} />

        </Route>
    )
);
