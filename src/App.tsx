import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import { router } from "@/routes/router";

export const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};
