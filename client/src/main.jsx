import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import myAxios from "./services/myAxios";

// APP PAGES
import App from "./App";
import Homepage from "./pages/Homepage";
import Artworks from "./pages/Artworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import RoadMap from "./pages/RoadMap";
import Ranking from "./pages/Ranking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProfileEdition from "./pages/ProfileEdition";
import RecoverPassword from "./pages/RecoverPassword";
import PwdEdition from "./pages/PwdEdition";

// NEW ARTWORK PAGES
import FillArtwork from "./pages/FillArtwork";
import Camera from "./components/NewArtwork/Camera/Camera";
import FormArtwork from "./components/NewArtwork/FormArtwork/FormArtwork";
import ValidationArtwork from "./pages/ValidationArtwork";

// ADMIN PAGES
import Admin from "./pages/Admin/Admin";
import Members from "./pages/Admin/Members";
import Statistics from "./pages/Admin/Statistics";
import ArtworkReported from "./pages/Admin/ArtworkReported";
import ArtworkReportedDetails from "./pages/Admin/ArtworkReportedDetails";
import ArtworkValidation from "./pages/Admin/ArtworkValidation";
import ArtworkValidationDetails from "./pages/Admin/ArtworkValidationDetails";

// ERROR PAGE
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: async () => {
          const response = await myAxios.get("/api/artworks");
          return response.data;
        },
      },
      {
        path: "/oeuvres",
        element: <Artworks />,
        loader: async () => {
          const response = await myAxios.get("/api/artworks");
          return response.data;
        },
      },
      {
        path: "/oeuvre/:id",
        element: <ArtworkDetails />,
        loader: async ({ params }) => {
          const artwork = await myAxios.get(`/api/artworks/${params.id}`);
          if (artwork.data.validate === 0) {
            return redirect("/oeuvres");
          }
          return artwork.data;
        },
      },
      {
        path: "/carte",
        element: <RoadMap />,
        loader: async () => {
          const response = await myAxios.get("/api/artworks");
          return response.data;
        },
      },
      {
        path: "/classement",
        element: <Ranking />,
        loader: async () => {
          const response = await myAxios.get("/api/members/ranked");
          return response.data;
        },
      },
      {
        path: "/inscription",
        element: <Register />,
      },
      {
        path: "/connexion",
        element: <Login />,
      },
      {
        path: "/a-propos",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profil/:id",
        element: <Profile />,
      },
      {
        path: "/profil/edit/:id",
        element: <ProfileEdition />,
      },
      {
        path: "/recuperation-mdp",
        element: <RecoverPassword />,
      },
      {
        path: "/recuperation-mdp/:token",
        element: <PwdEdition />,
      },
    ],
  },

  {
    element: <FillArtwork />,
    children: [
      {
        path: "/ajouter-oeuvre/camera",
        element: <Camera />,
      },
      {
        path: "/ajouter-oeuvre/formulaire",
        element: <FormArtwork />,
      },
      {
        path: "/ajouter-oeuvre/validation",
        element: <ValidationArtwork />,
      },
    ],
  },
  {
    element: <Admin />,
    children: [
      {
        path: "/admin/statistiques",
        element: <Statistics />,
      },
      {
        path: "/admin/membres",
        element: <Members />,
      },
      {
        path: "/admin/oeuvres-a-valider",
        element: <ArtworkValidation />,
        loader: async () => {
          const artworkNV = await myAxios.get(
            "/api/artworks/admin/not-validate"
          );
          return artworkNV.data;
        },
      },
      {
        path: "/admin/oeuvre-non-validee/:id",
        element: <ArtworkValidationDetails />,
        loader: async ({ params }) => {
          const artworksNVD = await myAxios.get(
            `/api/artworks/admin/not-validate/${params.id}`
          );

          return artworksNVD.data;
        },
      },
      {
        path: "/admin/oeuvres-signalees",
        element: <ArtworkReported />,
        loader: async () => {
          const artworksReported = await myAxios.get(
            "/api/artworks/admin/reported"
          );
          return artworksReported.data;
        },
      },
      {
        path: "/admin/oeuvre-a-valider/:id",
        element: <ArtworkReportedDetails />,
        loader: async ({ params }) => {
          const artworksReportedByID = await myAxios.get(
            `/api/artworks/admin/reported/${params.id}`
          );
          return artworksReportedByID.data;
        },
      },
    ],
  },
  {
    element: <Error />,
    path: "/erreur",
  },
  {
    element: <Error/>,
    path: "*",
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
