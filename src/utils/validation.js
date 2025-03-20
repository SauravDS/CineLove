function validateVideoUrl(url) {
    if (!url || typeof url !== 'string') return false;
  
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/)?([A-Za-z0-9_-]{11})(\?.*)?$/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)(\/.*)?$/;
  
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  }
  
  export { validateVideoUrl };