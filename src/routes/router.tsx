import { createBrowserRouter, Navigate } from "react-router-dom";

import { ContentContainer } from "../components/contentContainer/ContentContainer";
import { lazy } from "react";
import { HOME_PATH, IMAGE_DETAILS_PATH } from "./paths";

const Images = lazy(() => import("../pages/Images"));
const ImageDetails = lazy(() => import("../pages/ImageDetails"));

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <ContentContainer />,
    children: [
      { index: true, element: <Images /> },
      { path: IMAGE_DETAILS_PATH, element: <ImageDetails /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
