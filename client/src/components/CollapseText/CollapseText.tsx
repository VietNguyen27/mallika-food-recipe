import React, { useState } from 'react';

interface CollapseTextProps {
  className?: string;
  children: string;
}

const MAX_TEXT_LENGTH = 80;

const CollapseText: React.FC<CollapseTextProps> = ({ className, children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const renderText = (text: string): string => {
    if (text.length >= MAX_TEXT_LENGTH && isCollapsed) {
      return text.slice(0, MAX_TEXT_LENGTH) + '...';
    }
    return text;
  };

  const renderCollapseToggle = (text) => {
    let toggleText = '';

    if (isCollapsed) {
      toggleText = 'read more';
    } else {
      toggleText = 'show less';
    }

    if (text.length >= MAX_TEXT_LENGTH) {
      return React.createElement(
        'button',
        {
          className: 'text-orange ml-1',
          onClick: () => setIsCollapsed((prevState) => !prevState),
        },
        toggleText
      );
    }

    return null;
  };

  return (
    <p className={className}>
      {renderText(children)}
      {renderCollapseToggle(children)}
    </p>
  );
};

export default CollapseText;
