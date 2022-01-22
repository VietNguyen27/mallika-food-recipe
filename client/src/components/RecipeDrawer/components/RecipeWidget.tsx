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
import { useDispatch } from 'react-redux';
import {
  changePositionRecipeWidget,
  editRecipeWidget,
  removeRecipeWidget,
} from '@features/recipe-slice';
import { DOWNWARDS, UPWARDS } from '@config/constants';

interface RecieWidgetProps {
  type: string;
  _id?: string;
  title: string;
  isHeader: boolean;
  setEditable?: (editable: boolean) => void;
}

const RecipeWidget: React.FC<RecieWidgetProps> = ({
  type,
  _id,
  title,
  isHeader,
  setEditable,
}) => {
  const { isShowing, toggle } = useToggle();
  const dispatch = useDispatch();
  const titleClassNames = cx(
    'pl-2',
    isHeader ? 'text-xl font-semibold' : 'text-sm'
  );

  const onEditWidget = () => {
    if (setEditable) {
      setEditable(true);
    }
  };

  const onChangeWidgetPosition = (direction) => {
    dispatch(
      changePositionRecipeWidget({
        type,
        _id,
        direction,
      })
    );
  };

  const onSetAsItem = () => {
    dispatch(editRecipeWidget({ type, _id, isHeader: !isHeader }));
  };

  const onRemoveWidget = () => {
    dispatch(
      removeRecipeWidget({
        type,
        _id,
      })
    );
  };

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
        <DropdownItem onClick={() => onEditWidget()}>
          <Edit20Regular />
          Edit
        </DropdownItem>
        <DropdownItem onClick={() => onChangeWidgetPosition(UPWARDS)}>
          <ChevronUp20Regular />
          Add Item Above
        </DropdownItem>
        <DropdownItem onClick={() => onChangeWidgetPosition(DOWNWARDS)}>
          <ChevronDown20Regular />
          Add Item Below
        </DropdownItem>
        <DropdownItem onClick={() => onSetAsItem()}>
          <Flag20Regular />
          Set as {isHeader ? 'Item' : 'Header'}
        </DropdownItem>
        <DropdownItem onClick={() => onRemoveWidget()}>
          <Delete20Regular />
          Delete
        </DropdownItem>
      </Dropdown>
    </>
  );
};

export default RecipeWidget;
