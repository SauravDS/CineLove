const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

// Placeholder for YouTube/Vimeo API keys (set in .env)
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const VIMEO_ACCESS_TOKEN = process.env.REACT_APP_VIMEO_ACCESS_TOKEN;

async function fetchVideoMetadata(videoUrl) {
  try {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = extractYouTubeId(videoUrl);
      if (!videoId) throw new Error('Invalid YouTube URL');
      return await fetchYouTubeMetadata(videoId);
    } else if (videoUrl.includes('vimeo.com')) {
      const videoId = extractVimeoId(videoUrl);
      if (!videoId) throw new Error('Invalid Vimeo URL');
      return await fetchVimeoMetadata(videoId);
    } else {
      throw new Error('Unsupported video platform');
    }
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    throw error;
  }
}

async function fetchYouTubeMetadata(videoId) {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not set; returning basic metadata');
    return { id: videoId, title: 'YouTube Video', platform: 'youtube' };
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch YouTube metadata');
  const data = await response.json();
  if (!data.items.length) throw new Error('YouTube video not found');

  return {
    id: videoId,
    title: data.items[0].snippet.title,
    platform: 'youtube',
  };
}

async function fetchVimeoMetadata(videoId) {
  if (!VIMEO_ACCESS_TOKEN) {
    console.warn('Vimeo access token not set; returning basic metadata');
    return { id: videoId, title: 'Vimeo Video', platform: 'vimeo' };
  }

  const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
    headers: {
      Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch Vimeo metadata');
  const data = await response.json();

  return {
    id: videoId,
    title: data.name,
    platform: 'vimeo',
  };
}

function extractYouTubeId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractVimeoId(url) {
  const regex = /vimeo\.com\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export { fetchVideoMetadata };