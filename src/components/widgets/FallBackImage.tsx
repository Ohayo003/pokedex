import React, { useEffect, useState } from "react";
import {
  Image as CustomImage,
  ImageProps as CustomImageProps,
} from "@chakra-ui/react";

interface ImageProps {
  src: string;
  /**
   *
   * Displayed while the image is still loading
   *
   */
  loader?: JSX.Element | string;
  /**
   *
   * The fallback image url.
   * Image will result to error if fallback url does not exist
   *
   */
  fallbackImage?: string;
  isRecent: boolean;
}

const previouslyLoadedImage: string[] = [];

const FallBackImage = ({
  src,
  loader,
  fallbackImage,
  isRecent,
  ...props
}: ImageProps & Omit<CustomImageProps, "fallbackImage">) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (previouslyLoadedImage.includes(src)) return setLoading(false);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      previouslyLoadedImage.push(src);
      setLoading(false);
    };

    image.onerror = () => {
      setError(true);
      setLoading(false);
    };

    return () => {
      setLoading(true);
      setError(false);

      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <>
      {!!loading && loader}
      {!loading && (
        <CustomImage
          src={!error ? src : fallbackImage}
          height={error ? (isRecent ? "2.5rem" : "6rem") : "inherit"}
          width={error ? (isRecent ? "2.5rem" : "6rem") : "inherit"}
          position={error ? "absolute" : "relative"}
          top={error ? "50%" : ""}
          transform={error ? "translate(-50%, -50%)" : ""}
          left={error ? "50%" : ""}
          loading="lazy"
          {...props}
        />
      )}
    </>
  );
};

export default FallBackImage;
