import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { pexelsService } from "@/services";

import { BackButton, Container, ErrorText, ImageWrapper, InfoBox, Loading } from "./styled";

export const ImageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPhoto = async () => {
      try {
        const res = await pexelsService.getPhotoById(id);
        setPhoto(res);
      } catch (err) {
        console.error("Failed to load photo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, [id]);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (!photo) {
    return <ErrorText>Photo not found</ErrorText>;
  }

  const aspectratio = photo.width / photo.height;

  return (
    <Container>
      <BackButton to={"/"}>← Back</BackButton>

      <ImageWrapper aspectratio={aspectratio}>
        <img src={photo.src.large} alt={photo.alt} loading="lazy" />
      </ImageWrapper>

      <InfoBox>
        <h2>{photo.alt || "Untitled Photo"}</h2>
        <p>
          Photo by:{" "}
          <a href={photo.photographer_url} target="_blank" rel="noreferrer">
            {photo.photographer}
          </a>
        </p>
      </InfoBox>
    </Container>
  );
};
