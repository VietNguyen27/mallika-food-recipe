import {
  useState,
  ReactChild,
  ReactChildren,
  Fragment,
  cloneElement,
} from 'react';
import cx from 'clsx';
import Tooltip from '@components/Tooltip/Tooltip';
import { Info16Filled } from '@fluentui/react-icons';

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
  error?: string;
  onScroll?: (e) => void;
}

interface TabLabelProps {
  children: ReactChild | ReactChildren;
  isActive: boolean;
  error?: string;
  onClick: () => void;
}

const TabLabel: React.FC<TabLabelProps> = ({
  children,
  isActive,
  error,
  ...rest
}) => {
  const defaultClassName =
    'relative flex-auto text-center cursor-pointer py-1.5 px-2 rounded-3xl transition-all duration-200';
  const allClassNames = cx(
    defaultClassName,
    isActive
      ? 'bg-orange text-white'
      : 'bg-transparent text-gray-800 hover:bg-gray-100'
  );

  return (
    <li className={allClassNames} {...rest}>
      {children}
      {error && (
        <Tooltip
          message={error}
          className='absolute top-2 right-0 -translate-y-1/2 text-red-500'
        >
          <Info16Filled />
        </Tooltip>
      )}
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
  const defaultClassName = 'flex flex-col items-stretch h-full';
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
              error={child.props.error && child.props.error}
            >
              {child.props.label}
            </TabLabel>
          ))}
      </ul>
      {children instanceof Array &&
        children.map((child, index) => {
          const className = cx(
            child.props.className,
            child.props.label !== activeTab && 'hidden'
          );

          return (
            <Fragment key={index}>
              {cloneElement(child, {
                className,
              })}
            </Fragment>
          );
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
