import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@components/Drawer';
import { Tab, Tabs } from '@components/Tabs';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';
import {
  clearErrors,
  clearRecipeWidgets,
  selectorRecipeError,
} from '@features/recipe-slice';
import { getErrorFromJoiMessage } from '@helpers/helpers';
import IntroTab from './components/IntroTab';
import IngredientTab from './components/IngredientTab';
import StepTab from './components/StepTab';

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

const CreateRecipeDrawer = () => {
  const active = useSelector(
    ({ ui }: RootState) => ui.createRecipeDrawerShowing
  );
  const dispatch = useDispatch();
  const error = useSelector(selectorRecipeError);
  const recipeError: any = getErrorFromJoiMessage(error);
  const { ingredients, steps, ...intro } = recipeError;
  const introError =
    Object.keys(intro).length > 0 ? 'There is some error' : null;

  const onCloseDrawer = (): void => {
    dispatch(uiActions.setCreateRecipeDrawerShowing(false));
    dispatch(clearErrors());
    dispatch(clearRecipeWidgets());
  };

  return (
    <Drawer
      title='Create new recipe'
      open={active}
      onClose={() => onCloseDrawer()}
    >
      <Tabs className='h-full pt-3'>
        {tabs.map((tab) => {
          const { name, label, component: Component } = tab;

          return (
            <Tab
              label={label}
              key={label}
              className='h-9/10 overflow-hidden pb-6'
              error={name !== 'intro' ? recipeError[name] : introError}
            >
              <div className='h-full overflow-auto scrollbar-none'>
                <Component />
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </Drawer>
  );
};

export default CreateRecipeDrawer;
