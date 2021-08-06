import React from 'react';

import Tag from 'components/Tag';

import { SmallRose } from './styles';

type TitleCellProps = {
  title: string;
  artist: string;
};

const TitleCell: React.FC<TitleCellProps> = ({ title, artist }) => (
  <td>
    <span>{title}</span>
    {artist === 'Emily Fox' && (
      <>
        {[
          'Where Feelings Grow',
          'Toxic',
          'Faces (No One Else Is Counting)',
          'Original Human',
          'gods',
          'House Song',
          'Cry',
          'One Part',
          "Don't know why I'm here",
        ].includes(title) && <SmallRose />}
        <Tag>Original</Tag>
      </>
    )}
  </td>
);

export default TitleCell;
