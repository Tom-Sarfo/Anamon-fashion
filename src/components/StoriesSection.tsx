import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { LazyImage } from "./LazyImage";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  username: string;
  avatar: string;
  media: {
    type: "image" | "video";
    url: string;
    duration?: number; // for videos
  }[];
  timestamp: string;
}

// Dummy stories data
const dummyStories: Story[] = [
  {
    id: "1",
    username: "Tomus",
    avatar:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1755433677/Tomus-Realistic-logo-icon_w7mmsa.png",
    media: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dki2r1gnf/video/upload/v1755433911/Tomus_Footwear_Commercial_720p_08_2024_v1_cwjtbc.mp4",
        duration: 10,
      },
    ],
    timestamp: "4 hours ago",
  },
  {
    id: "2",
    username: "Rose",
    avatar:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1730041000/Screenshot_from_2024-10-27_14-55-57_tliye6.png",
    media: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dki2r1gnf/video/upload/v1730039273/IMG_1004_z5tiec.mp4",
        duration: 8,
      },
    ],
    timestamp: "3 days ago",
  },
  {
    id: "3",
    username: "Tasha",
    avatar:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1730042829/Screenshot_from_2024-10-27_15-25-10_ohstfq.png",
    media: [
      {
        type: "video",
        url: "https://res.cloudinary.com/dki2r1gnf/video/upload/v1730042358/Snapinsta.app_video_77420AC7BD161C299618E3C08026C695_video_dashinit_lyylcb.webm",
        duration: 15,
      },
    ],
    timestamp: "1 day ago",
  },
  {
    id: "4",
    username: "Edward",
    avatar:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1730045281/Screenshot_from_2024-10-27_16-07-26_sp5wec.png",
    media: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dki2r1gnf/image/upload/v1730045885/photo_2024-10-27_16-17-49_lkpukf.jpg",
      },
    ],
    timestamp: "4 days ago",
  },
  {
    id: "5",
    username: "LifeStyle",
    avatar:
      "https://res.cloudinary.com/dki2r1gnf/image/upload/v1755433677/Tomus-Realistic-logo-icon_w7mmsa.png",
    media: [
      {
        type: "image",
        url: "https://res.cloudinary.com/dki2r1gnf/image/upload/v1755435680/photo_2025-08-17_12-59-53_kdpudj.jpg",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dki2r1gnf/image/upload/v1755435680/photo_2025-08-17_12-58-37_myyatd.jpg",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dki2r1gnf/image/upload/v1729741164/ad89e077-925a-4b8c-91a8-172329704571_pgpuo3.jpg",
      },
    ],
    timestamp: "2 days ago",
  },
];

interface StoriesSectionProps {
  className?: string;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({
  className,
}) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setCurrentMediaIndex(0);
    setIsPlaying(false);
    setVideoError(false);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
    setCurrentMediaIndex(0);
    setIsPlaying(false);
    setVideoError(false);
  };

  const handleNextMedia = () => {
    if (selectedStory && currentMediaIndex < selectedStory.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
      setVideoError(false);
    } else {
      handleCloseModal();
    }
  };

  const handlePrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
      setVideoError(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    } else if (e.key === "ArrowRight") {
      handleNextMedia();
    } else if (e.key === "ArrowLeft") {
      handlePrevMedia();
    }
  };

  const handleStoryAreaClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.3) {
      handlePrevMedia();
    } else if (clickX > width * 0.7) {
      handleNextMedia();
    }
  };

  return (
    <>
      {/* Stories Section */}
      <div className={cn("bg-white py-4 px-4", className)}>
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="mb-4 text-center">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
              Share your experience with us
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Tap to view customer stories and experiences
            </p>
          </div>

          {/* Stories Scroll */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {dummyStories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center space-y-2 cursor-pointer flex-shrink-0"
                onClick={() => handleStoryClick(story)}
              >
                {/* Story Ring */}
                <div className="relative">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full p-0.5 bg-gradient-to-r from-purple-500 to-pink-500">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                      <LazyImage
                        src={story.avatar}
                        alt={story.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Multiple Images Indicator - Dashed Border */}
                  {story.media.length > 1 &&
                    !story.media.some((media) => media.type === "video") && (
                      <div className="absolute inset-0 rounded-full">
                        <svg
                          className="absolute inset-0 w-full h-full"
                          viewBox="0 0 100 100"
                          style={{ transform: "rotate(-90deg)" }}
                        >
                          {Array.from(
                            { length: story.media.length },
                            (_, index) => {
                              const anglePerSegment = 360 / story.media.length;
                              const startAngle = index * anglePerSegment;
                              const endAngle = (index + 1) * anglePerSegment;
                              const gap = 4; // Gap in degrees
                              const radius = 50;
                              const strokeWidth = 2;

                              const startRad =
                                ((startAngle + gap / 2) * Math.PI) / 180;
                              const endRad =
                                ((endAngle - gap / 2) * Math.PI) / 180;

                              const x1 = 50 + radius * Math.cos(startRad);
                              const y1 = 50 + radius * Math.sin(startRad);
                              const x2 = 50 + radius * Math.cos(endRad);
                              const y2 = 50 + radius * Math.sin(endRad);

                              const largeArcFlag =
                                anglePerSegment - gap > 180 ? 1 : 0;

                              return (
                                <path
                                  key={index}
                                  d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                                  stroke="white"
                                  strokeWidth={strokeWidth}
                                  fill="none"
                                />
                              );
                            }
                          )}
                        </svg>
                      </div>
                    )}
                </div>
                {/* Username */}
                <span className="text-xs lg:text-sm text-gray-600 font-medium truncate max-w-16 lg:max-w-20">
                  {story.username}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevMedia}
            className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors",
              currentMediaIndex === 0 && "opacity-50 cursor-not-allowed"
            )}
            disabled={currentMediaIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={handleNextMedia}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Story Content */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={handleStoryAreaClick}
          >
            {/* Progress Bar */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="flex space-x-1">
                {selectedStory.media.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      index <= currentMediaIndex ? "bg-white" : "bg-white/30"
                    )}
                    style={{
                      width: `${100 / selectedStory.media.length}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Media */}
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedStory.media[currentMediaIndex].type === "image" ? (
                <LazyImage
                  src={selectedStory.media[currentMediaIndex].url}
                  alt={`${selectedStory.username} story`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  {!videoError ? (
                    <video
                      src={selectedStory.media[currentMediaIndex].url}
                      className="max-w-full max-h-full object-contain"
                      autoPlay={isPlaying}
                      loop
                      muted
                      controls
                      onLoadedData={() => setIsPlaying(true)}
                      onError={(e) => {
                        console.error("Video loading error:", e);
                        setIsPlaying(false);
                        setVideoError(true);
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center p-4">
                      <div>
                        <p className="text-lg font-semibold mb-2">
                          Video Story
                        </p>
                        <p className="text-sm opacity-75">
                          {selectedStory.username} shared a video story
                        </p>
                        <p className="text-xs opacity-50 mt-2">
                          Duration:{" "}
                          {selectedStory.media[currentMediaIndex].duration}s
                        </p>
                        <p className="text-xs opacity-50 mt-1">
                          (Video unavailable)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Story Info */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <LazyImage
                    src={selectedStory.avatar}
                    alt={selectedStory.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <p className="font-semibold">{selectedStory.username}</p>
                  <p className="text-sm text-gray-300">
                    {selectedStory.timestamp}
                  </p>
                </div>
                {selectedStory.media[currentMediaIndex].type === "video" && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="ml-auto text-white hover:text-gray-300 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
