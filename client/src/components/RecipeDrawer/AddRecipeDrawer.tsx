import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import { Tab, Tabs } from '@components/Tabs/Tabs';
import IntroTab from './components/IntroTab';
import IngredientTab from './components/IngredientTab';
import StepTab from './components/StepTab';
import { clearErrors, selectorRecipeError } from '@features/recipe-slice';
import { getErrorFromJoiMessage } from '@helpers/helpers';

const tabs = [
  {
    name: 'intro',
    label: 'Intro',
    component: IntroTab,
  },
  {
    name: 'ingredients',
    label: 'Ingredients',
    component: IngredientTab,
  },
  {
    name: 'steps',
    label: 'Steps',
    component: StepTab,
  },
];

const AddRecipeDrawer = () => {
  const active = useSelector(({ ui }: RootState) => ui.addRecipeDrawerShowing);
  const dispatch = useDispatch();
  const error = useSelector(selectorRecipeError);
  const recipeError = getErrorFromJoiMessage(error);

  const onCloseDrawer = (): void => {
    dispatch(uiActions.setAddRecipeDrawerShowing(false));
    dispatch(clearErrors());
  };

  return (
    <Drawer
      title='Add new recipe'
      open={active}
      onClose={() => onCloseDrawer()}
    >
      <Tabs className='pt-3'>
        {tabs.map((tab) => {
          const { name, label, component: Component } = tab;

          return (
            <Tab
              label={label}
              key={label}
              className='h-9/10 overflow-hidden pb-6'
              error={name !== 'intro' ? recipeError[name] : null}
            >
              <div className='h-full overflow-auto scrollbar-none'>
                <Component />
              </div>
            </Tab>
          );
        })}
      </Tabs>
      <button
        type='submit'
        form='add-new-recipe'
        className='absolute top-5 right-4 text-orange'
      >
        Save
      </button>
    </Drawer>
  );
};

export default AddRecipeDrawer;
