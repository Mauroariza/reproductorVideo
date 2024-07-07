import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'; 

interface VideoPlayerProps {
  url: string;
  isPlaying: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isPlaying }) => {
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.getInternalPlayer()?.play();
    } else {
      playerRef.current?.getInternalPlayer()?.pause();
    }
  }, [isPlaying]);

  return (
    <div 
      className="video-player-wrapper rounded-md overflow-hidden w-full  bg-black flex items-center justify-center"
      style={{ aspectRatio: '16 / 9' }}
    >
      <div className="relative w-full h-full">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={isPlaying}
          controls
          width="100%"
          height="100%"
          className="rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
      </div>
    </div>
  );
}

export default VideoPlayer;

