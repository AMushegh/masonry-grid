import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

import { ContentContainer } from "@/components/contentContainer/ContentContainer";
import { HOME_PATH, IMAGE_DETAILS_PATH } from "@/routes/paths";

const ImagesGridPage = lazy(() => import("@/pages/ImagesGridPage"));
const SingleImagePage = lazy(() => import("@/pages/SingleImagePage"));

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <ContentContainer />,
    children: [
      { index: true, element: <ImagesGridPage /> },
      { path: IMAGE_DETAILS_PATH, element: <SingleImagePage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
