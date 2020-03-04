import React from 'react';

type IconProps = {
  name: string;
  iconStyle?: 'solid' | 'regular';
  size?: 1 | 2;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({
  name,
  iconStyle = 'solid',
  onClick,
  size = 2
}) => {
  const styleName = iconStyle === 'solid' ? 'fas' : 'far';
  const className = `${styleName} ${name} fa-${size}x`;
  return <i className={className} onClick={onClick}></i>;
};

export default Icon;
