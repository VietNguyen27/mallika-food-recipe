import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import IntroTab from './components/IntroTab';
import IngredientTab from './components/IngredientTab';
import StepTab from './components/StepTab';

const tabs = [
  {
    label: 'Intro',
    component: IntroTab,
  },
  {
    label: 'Ingredients',
    component: IngredientTab,
  },
  {
    label: 'Steps',
    component: StepTab,
  },
];

const AddRecipeDrawer = () => {
  const active = useSelector(({ ui }: RootState) => ui.addRecipeDrawerShowing);
  const dispatch = useDispatch();

  return (
    <Drawer
      title='Add new recipe'
      open={active}
      onClose={() => dispatch(uiActions.setAddRecipeDrawerShowing(false))}
    >
      <Tabs className='pt-3'>
        {tabs.map((tab) => {
          const { label, component: Component } = tab;

          return (
            <Tab
              label={label}
              key={label}
              className='h-9/10 overflow-hidden pb-6'
            >
              <div className='h-full overflow-auto scrollbar-none'>
                <Component />
              </div>
            </Tab>
          );
        })}
      </Tabs>
      <button className='absolute top-5 right-4 text-orange'>Save</button>
    </Drawer>
  );
};

export default AddRecipeDrawer;
