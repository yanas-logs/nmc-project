"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time: number) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

export default function VideoPlayer({
  url = "https://assets.mixkit.co/videos/preview/mixkit-curvy-road-on-a-tree-covered-hill-41537-large.mp4",
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const volumeSlider = useRef<HTMLInputElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState({
    volume: "high",
    totalTimeElem: "00:00",
    currentTimeElem: "00:00",
    isScrubbing: false,
    wasPaused: false,
    thumbnailImg: "",
    playbackSpeed: 1,
    previewImgSrc: "",
    previewPosition: 0.5,
    progressPosition: 0.25,
    percent: 0,
    captionsVisible: false,
    isPaused: true,
    theaterMode: false,
    fullScreenMode: false,
    miniPlayerMode: false,
  });

  const togglePlay = () => {
    videoRef.current?.paused
      ? videoRef.current.play()
      : videoRef.current?.pause();
  };

  const toggleMute = () => {
    if (videoRef.current != null) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  function changePlaybackSpeed() {
    if (videoRef.current == null) return;
    let newPlaybackRate = videoRef.current.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    videoRef.current.playbackRate = newPlaybackRate;
    setPlayer((prev) => ({ ...prev, playbackSpeed: newPlaybackRate }));
  }

  function toggleCaptions() {
    if (videoRef.current == null || videoRef.current.textTracks.length == 0)
      return;

    const isHidden = videoRef.current.textTracks[0].mode === "hidden";
    videoRef.current.textTracks[0].mode = isHidden ? "showing" : "hidden";

    setPlayer((prev) => ({ ...prev, captionsVisible: isHidden }));
  }

  const volumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (videoRef.current != null) {
      videoRef.current.volume = Number.parseFloat(e.target.value);
      videoRef.current.muted = e.target.value === "0";
    }
  };

  const toggleTheaterMode = () => {
    setPlayer((prev) => ({ ...prev, theaterMode: !prev.theaterMode }));
  };

  function skip(duration: number) {
    if (videoRef.current == null) return;
    videoRef.current.currentTime += duration;
  }

  const toggleFullScreenMode = () => {
    if (document.fullscreenElement === null) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleMinPlayerMode = () => {
    if (document.pictureInPictureElement === null) {
      videoRef.current?.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  };

  function toggleScrubbing(e: MouseEvent) {
    if (timelineRef.current == null || videoRef.current == null) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    let isScrubbing = (e.buttons & 1) === 1;
    let wasPaused: boolean | undefined;
    setPlayer((prev) => ({ ...prev, isScrubbing }));
    if (isScrubbing) {
      wasPaused = videoRef.current.paused;
      videoRef.current.pause();
    } else {
      videoRef.current.currentTime = percent * videoRef.current.duration;
      if (!player.wasPaused) videoRef.current.play();
    }

    setPlayer((prev) => ({
      ...prev,
      isScrubbing,
      wasPaused: wasPaused == undefined ? prev.wasPaused : wasPaused,
    }));

    handleTimelineUpdate(e);
  }

  function handleTimelineUpdate(e: MouseEvent) {
    if (timelineRef.current == null || videoRef.current == null) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    // const previewImgNumber = Math.max(
    //   1,
    //   Math.floor((percent * videoRef.current.duration) / 10)
    // );
    // const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`;
    const previewImgSrc = `https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fletsenhance.io%2Fstatic%2F8f5e523ee6b2479e26ecc91b9c25261e%2F1015f%2FMainAfter.jpg&imgrefurl=https%3A%2F%2Fletsenhance.io%2F&docid=-t22bY2ix3gHaM&tbnid=tYmxDgFq4MrkJM&vet=12ahUKEwjoiPfpkJmGAxVV4jgGHeFWAj0QM3oECBcQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjoiPfpkJmGAxVV4jgGHeFWAj0QM3oECBcQAA`;

    setPlayer((prev) => ({ ...prev, previewImgSrc, previewPosition: percent }));

    if (player.isScrubbing) {
      e.preventDefault();
      setPlayer((prev) => ({
        ...prev,
        thumbnailImg: previewImgSrc,
        progressPosition: percent,
      }));
    }
  }

  useEffect(() => {
    videoRef.current?.addEventListener("click", togglePlay);
    videoRef.current?.addEventListener("play", () => {
      setPlayer((prev) => ({ ...prev, isPaused: false }));
    });
    videoRef.current?.addEventListener("pause", () => {
      setPlayer((prev) => ({ ...prev, isPaused: true }));
    });

    document.addEventListener("fullscreenchange", () => {
      setPlayer((prev) => ({ ...prev, fullScreenMode: !prev.fullScreenMode }));
    });

    videoRef.current?.addEventListener("loadeddata", () => {
      if (videoRef.current == null) return;
      setPlayer((prev) => ({
        ...prev,
        totalTimeElem: formatDuration(videoRef.current?.duration ?? 0),
      }));
    });

    videoRef.current?.addEventListener("timeupdate", () => {
      if (videoRef.current == null) return;
      setPlayer((prev) => ({
        ...prev,
        currentTimeElem: formatDuration(videoRef.current?.currentTime ?? 0),
        percent:
          (videoRef?.current?.currentTime ?? 1) /
          (videoRef?.current?.duration ?? 1),
      }));
    });

    videoRef.current?.addEventListener("enterpictureinpicture", () => {
      setPlayer((prev) => ({ ...prev, miniPlayerMode: true }));
    });
    videoRef.current?.addEventListener("leavepictureinpicture", () => {
      setPlayer((prev) => ({ ...prev, miniPlayerMode: false }));
    });

    videoRef.current?.addEventListener("volumechange", () => {
      if (volumeSlider.current == null || videoRef.current == null) return;
      volumeSlider.current.value = videoRef.current?.volume.toString();
      let volumeLevel;

      if (videoRef.current.muted || videoRef.current.volume == 0) {
        volumeLevel = "muted";
        volumeSlider.current.value = "0";
      } else if (videoRef.current.volume >= 0.5) {
        volumeLevel = "high";
      } else {
        volumeLevel = "low";
      }

      setPlayer((prev) => ({ ...prev, volume: volumeLevel }));
    });

    timelineRef.current?.addEventListener("mousemove", handleTimelineUpdate);
    timelineRef.current?.addEventListener("mousedown", toggleScrubbing);
    document.addEventListener("mouseup", (e) => {
      if (player.isScrubbing) toggleScrubbing(e);
    });
    document.addEventListener("mousemove", (e) => {
      if (player.isScrubbing) handleTimelineUpdate(e);
    });

    document.addEventListener("keydown", (event) => {
      const tageName = document.activeElement?.tagName.toLowerCase();

      if (tageName === "input") return;
      switch (event.key.toLowerCase()) {
        case " ":
          if (tageName === "button") return;
        case "k":
          togglePlay();
          break;
        case "f":
          toggleFullScreenMode();
          break;
        case "t":
          toggleTheaterMode();
          break;
        case "i":
          toggleMinPlayerMode();
          break;
        case "m":
          toggleMute();
          break;
        case "arrowleft":
        case "j":
          skip(-5);
          break;
        case "arrowright":
        case "l":
          skip(5);
          break;
        case "c":
          toggleCaptions();
          break;
      }
    });
  }, []);

  return (
    <div
      className={cn(
        "relative w-11/12 max-w-6xl flex justify-center m-auto group bg-black",
        player.theaterMode || player.fullScreenMode
          ? "max-w-[initial] w-full"
          : "",
        player.theaterMode ? "h-[90vh]" : "",
        player.fullScreenMode ? "h-[100vh]" : ""
      )}
    >
      <Image
        className={cn(
          "absolute top-0 left-0 right-0 bottom-0 w-full h-full hidden",
          player.isScrubbing && "block"
        )}
        src={""}
        alt={""}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 text-white z-[100] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 before:absolute before:bottom-0 before:w-full before:aspect-[6/1] before:z-[-1] before:pointer-events-none before:bg-gradient-to-t before:from-[#000000bf] before:to-transparent",
          videoRef.current?.paused ? "opacity-100" : ""
        )}
      >
        <div className="h-[7px] mx-2 cursor-pointer flex items-center group/timeline">
          <div
            ref={timelineRef}
            style={{
              "--progress-position": player.progressPosition,
              "--preview-position": player.previewPosition,
            }}
            className={cn(
              "bg-[#6464647d] h-[3px] w-full relative group-hover/timeline:h-full",
              `before:absolute before:left-0 before:top-0 before:bottom-0 before:bg-[#969696] before:hidden group-hover/timeline:before:block before:right-[calc(100%-var(--preview-position)*100%)]`,
              player.isScrubbing && "before:block h-full",
              `after:absolute after:left-0 after:top-0 after:bottom-0 after:bg-red-800 after:right-[calc(100%-var(--progress-position)*100%)]`
            )}
          >
            <Image
              className={cn(
                "absolute h-[80px] aspect-[16/9] -top-4 translate-x-[-50%] translate-y-[-100%] rounded border-2 border-white hidden group-hover/timeline:block",
                player.isScrubbing && "block"
              )}
              src={""}
              alt={""}
            />
            <div
              className={cn(
                "absolute translate-x-[-50%] scale-0 group-hover/timeline:scale-100 h-[200%] top-[-50%] left-[calc(var(--progress-position)*100%)] bg-red-800 rounded-full transition-transform aspect-[1/1]",
                player.isScrubbing && "scale-100"
              )}
            ></div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-1">
          <button
            className="opacity-80 hover:opacity-100 text-white"
            onClick={togglePlay}
          >
            {player.isPaused ? (
              <svg viewBox="0 0 24 24" className="fill-white w-7 h-7">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="fill-white  w-7 h-7">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-2 group/volume">
            <button
              onClick={toggleMute}
              className="opacity-80 hover:opacity-100 text-white"
            >
              {player.volume === "high" ? (
                <svg viewBox="0 0 24 24" className="fill-white  w-6 h-6">
                  <path
                    fill="currentColor"
                    d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                  />
                </svg>
              ) : null}

              {player.volume === "low" ? (
                <svg viewBox="0 0 24 24" className="fill-white  w-7 h-7">
                  <path
                    fill="currentColor"
                    d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                  />
                </svg>
              ) : null}
              {player.volume === "muted" ? (
                <svg viewBox="0 0 24 24" className="fill-white  w-7 h-7">
                  <path
                    fill="currentColor"
                    d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                  />
                </svg>
              ) : null}
            </button>
            <input
              ref={volumeSlider}
              className="w-0 origin-left scale-0 transition-all group-hover/volume:w-28 group-focus-within/volume:w-28 group-hover/volume:scale-100 group-focus-within/volume:scale-100"
              type="range"
              min="0"
              max="1"
              step="any"
              defaultValue="1"
              onChange={volumeChange}
            />
          </div>
          <div className="flex items-center gap-1 text-sm flex-1">
            <div>{player.currentTimeElem}</div>/
            <div>{player.totalTimeElem}</div>
          </div>
          <button
            className={cn(
              "opacity-80 hover:opacity-100 text-white",
              player.captionsVisible ? "border-b-2 border-red-500" : ""
            )}
            onClick={toggleCaptions}
          >
            <svg viewBox="0 0 24 24" className="fill-white w-5 h-5">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              />
            </svg>
          </button>
          <button
            className="opacity-80 hover:opacity-100 text-white text-sm"
            onClick={changePlaybackSpeed}
          >
            {`${player.playbackSpeed}x`}
          </button>
          <button
            className="opacity-80 hover:opacity-100 text-white"
            onClick={toggleMinPlayerMode}
          >
            <svg viewBox="0 0 24 24" className="fill-white w-5 h-5">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          <button
            className="opacity-80 hover:opacity-100 text-white"
            onClick={toggleTheaterMode}
          >
            {player.theaterMode ? (
              <svg viewBox="0 0 24 24" className="fill-white w-6 h-6">
                <path
                  fill="currentColor"
                  d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="fill-white w-6 h-6">
                <path
                  fill="currentColor"
                  d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
                />
              </svg>
            )}
          </button>
          <button
            className="opacity-80 hover:opacity-100 text-white"
            onClick={toggleFullScreenMode}
          >
            {player.fullScreenMode ? (
              <svg viewBox="0 0 24 24" className="fill-white w-6 h-6">
                <path
                  fill="currentColor"
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="fill-white w-6 h-6">
                <path
                  fill="currentColor"
                  d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <video ref={videoRef} src={url} className="w-full" autoPlay></video>
    </div>
  );
}
