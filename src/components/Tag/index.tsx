import React from 'react';

import { TagContainer } from './styles';

const Tag: React.FC = ({ children }) => {
  return <TagContainer>{children}</TagContainer>;
};

export default Tag;
