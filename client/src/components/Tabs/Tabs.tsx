import { useState, ReactChild, ReactChildren } from 'react';
import cx from 'clsx';

interface TabsProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
  onTrigger?: () => void;
}

interface TabProps {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
  label: string;
  ref?: any;
  onScroll?: (e) => void;
}

interface TabLabelProps {
  children: ReactChild | ReactChildren;
  isActive: boolean;
  onClick: () => void;
}

const TabLabel: React.FC<TabLabelProps> = ({ children, isActive, ...rest }) => {
  const defaultClassName =
    'flex-auto text-center cursor-pointer py-1.5 px-2 rounded-3xl transition-all duration-200';
  const allClassNames = cx(
    defaultClassName,
    isActive
      ? 'bg-orange text-white'
      : 'bg-transparent text-gray-800 hover:bg-gray-100'
  );

  return (
    <li className={allClassNames} {...rest}>
      {children}
    </li>
  );
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  className,
  onTrigger,
  ...rest
}) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const defaultClassName = 'flex flex-col items-stretch';
  const allClassNames = cx(defaultClassName, className);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={allClassNames} {...rest}>
      <ul className='flex gap-3 border-b border-gray-400 px-layout pb-2'>
        {children instanceof Array &&
          children.map((child, index) => (
            <TabLabel
              key={index}
              isActive={child.props.label === activeTab}
              onClick={() => {
                onTrigger && onTrigger();
                changeTab(child.props.label);
              }}
            >
              {child.props.label}
            </TabLabel>
          ))}
      </ul>
      {children instanceof Array &&
        children.map((child) => {
          if (child.props.label === activeTab) {
            return child;
          }
        })}
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({
  children,
  label,
  className,
  onScroll,
  ...rest
}) => {
  return (
    <div className={className} onScroll={onScroll} {...rest}>
      {children}
    </div>
  );
};
