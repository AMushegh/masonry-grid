import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Suspense } from "react";

export const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};
