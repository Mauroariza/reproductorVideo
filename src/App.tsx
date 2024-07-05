import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import { PexelsResponse, Video } from './types';
import './App.css';

const PEXELS_API_KEY = 'UFCreoudjWmEEDbBCA2xJ0Qmdqm0Dqc1ahQ2x3lF2ZbiK3EUREFw9qp8';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoUrls, setVideoUrls] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        const response = await axios.get<PexelsResponse>('https://api.pexels.com/videos/popular', {
          headers: {
            Authorization: PEXELS_API_KEY
          },
          params: {
            per_page: 10
          }
        });
        const videos = response.data.videos;
        setVideoUrls(videos);
        if (videos.length > 0) {
          setCurrentVideo(videos[0]);
        }
      } catch (error) {
        console.error('Error fetching video URLs:', error);
      }
    };

    fetchVideoUrls();
  }, []);



  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row h-screen">
        <div className=" xl:w-[1600px] 3xl:w-[2400px] p-4">
          {currentVideo && (
            <div className="mb-4">
              <VideoPlayer url={currentVideo.video_files[0].link} isPlaying={isPlaying} />
            </div>
          )}
          <div className="flex justify-start">
          
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="ml-60 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-500"
            >
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 overflow-auto h-full md:h-screen bg-indigo-950  ">
          <h3 className="text-3xl font-bold mb-2">Lista de Videos</h3>
          <div className="space-y-4">
            {videoUrls.map((video, index) => (
              <div 
                key={index} 
                className="cursor-pointer flex items-center"
                onClick={() => handleVideoSelect(video)}
              >
                <img src={video.image} alt={video.user.name} className="w-24 h-16 object-cover rounded-md mr-2" />
                <p className="text-orange-500 font-bold hover:underline">{video.user.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
