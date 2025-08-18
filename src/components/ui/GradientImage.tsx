"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";

const fitVariants = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

type FitVariant = keyof typeof fitVariants;

interface GradientImagePropsType {
  src: string;
  fitVariant?: FitVariant;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  unoptimized?: boolean;
}

const SkeletonLoader = () => (
  <div className="absolute inset-0 animate-pulse">
    <div className="w-full h-full bg-gray-200">
      <div className="w-full h-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-300 to-transparent bg-[length:200%_100%]" />
    </div>
  </div>
);

export default function GradientImage({
  src,
  fitVariant = "cover",
  className = "",
  style,
  alt = "",
  priority = false,
  quality = 100,
  sizes,
  fallbackSrc,
  lazy = true,
  unoptimized = true,
}: GradientImagePropsType) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    if (fallbackSrc && !fallbackAttempted) {
      setCurrentSrc(fallbackSrc);
      setFallbackAttempted(true);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [fallbackSrc, fallbackAttempted]);

  const fitClass = useMemo(() => fitVariants[fitVariant], [fitVariant]);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
    setFallbackAttempted(false);
    setIsInView(!lazy || priority);
  }, [src, lazy, priority]);

  useEffect(() => {
    if (!lazy || priority || isInView || !containerRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority, isInView]);

  const shouldRenderImage = useMemo(
    () => currentSrc && !hasError && isInView,
    [currentSrc, hasError, isInView]
  );

  const showSkeleton = useMemo(
    () =>
      (isLoading && !hasError && currentSrc && isInView) ||
      !currentSrc ||
      hasError,
    [isLoading, hasError, currentSrc, isInView]
  );

  const imageClassName = useMemo(
    () =>
      clsx(
        "transition-opacity duration-300 ease-in-out",
        isLoading ? "opacity-0" : "opacity-100",
        fitClass,
        className
      ),
    [isLoading, fitClass, className]
  );

  const imageStyle = useMemo(
    () => ({
      transition: "opacity 0.3s ease-in-out",
      ...style,
    }),
    [style]
  );

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {showSkeleton && <SkeletonLoader />}

      {shouldRenderImage && (
        <Image
          src={currentSrc}
          fill
          alt={alt}
          className={imageClassName}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          quality={quality}
          unoptimized={unoptimized}
          sizes={sizes}
          loading={priority ? "eager" : lazy ? "lazy" : "eager"}
          placeholder="empty"
        />
      )}
    </div>
  );
}
