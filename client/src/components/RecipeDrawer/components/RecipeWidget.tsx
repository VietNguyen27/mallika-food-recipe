import React from 'react';
import cx from 'clsx';
import { Dropdown, DropdownItem } from '@components/Dropdown/Dropdown';
import useToggle from '@hooks/useToggle';
import {
  List20Regular,
  MoreVertical24Filled,
  Edit20Regular,
  ChevronDown20Regular,
  ChevronUp20Regular,
  Flag20Regular,
  Delete20Regular,
} from '@fluentui/react-icons';

interface RecieWidgetProps {
  title: string;
  isHeader: boolean;
}

const RecipeWidget: React.FC<RecieWidgetProps> = ({ title, isHeader }) => {
  const { isShowing, toggle } = useToggle();
  const titleClassNames = cx(
    'pl-2',
    isHeader ? 'text-lg font-semibold' : 'text-sm'
  );

  return (
    <>
      <div className='flex justify-between items-center pb-3'>
        <div className='flex items-center pr-2'>
          <List20Regular />
          <p className={titleClassNames}>{title}</p>
        </div>
        <button type='button' onClick={toggle}>
          <MoreVertical24Filled />
        </button>
      </div>
      <Dropdown isShowing={isShowing} onClose={toggle}>
        <DropdownItem onClick={() => console.log(123)}>
          <Edit20Regular />
          Edit
        </DropdownItem>
        <DropdownItem onClick={() => console.log(123)}>
          <ChevronUp20Regular />
          Add Item Above
        </DropdownItem>
        <DropdownItem onClick={() => console.log(123)}>
          <ChevronDown20Regular />
          Add Item Below
        </DropdownItem>
        <DropdownItem onClick={() => console.log(123)}>
          <Flag20Regular />
          Set as Item
        </DropdownItem>
        <DropdownItem onClick={() => console.log(123)}>
          <Delete20Regular />
          Delete
        </DropdownItem>
      </Dropdown>
    </>
  );
};

export default RecipeWidget;
