// types.ts
export interface VideoFile {
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    fps: number;
    link: string;
  }
  
  export interface Video {
    id: number;
    width: number;
    height: number;
    duration: number;
    full_res: null | string;
    tags: string[];
    url: string;
    image: string;
    avg_color: null | string;
    user: {
      id: number;
      name: string;
      url: string;
    };
    video_files: VideoFile[];
    video_pictures: {
      id: number;
      picture: string;
    }[];
  }
  
  export interface PexelsResponse {
    page: number;
    per_page: number;
    total_results: number;
    url: string;
    videos: Video[];
  }
  