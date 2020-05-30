import React from 'react';

import { VideoContainer, VideoIframe } from './styles';

type VideoProps = {
  title: string;
  src: string;
  className?: string;
};

const Video: React.FC<VideoProps> = ({ title, src, className }) => (
  <VideoContainer className={className}>
    <VideoIframe
      title={title}
      src={src}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </VideoContainer>
);

export default Video;
