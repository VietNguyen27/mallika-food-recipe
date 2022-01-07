import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import IntroTab from './components/IntroTab';

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
        <Tab label='Intro' className='h-4/5 overflow-auto scrollbar-none'>
          <IntroTab />
        </Tab>
        <Tab label='Ingredients'>Ingredients</Tab>
        <Tab label='Steps'>Steps</Tab>
      </Tabs>
    </Drawer>
  );
};

export default AddRecipeDrawer;
