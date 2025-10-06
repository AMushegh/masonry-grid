import { useEffect } from "react";
import { pexelsService } from "./services";

export const App = () => {
  useEffect(() => {
    pexelsService.searchPhotos("nature").then((photos) => {
      console.log("Fetched photos:", photos);
    });
  }, []);

  return "app";
};
