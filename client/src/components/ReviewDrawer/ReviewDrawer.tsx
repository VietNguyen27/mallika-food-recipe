import React from 'react';
import Drawer from '@components/Drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import { uiActions } from '@features/ui-slice';

const ReviewDrawer = () => {
  const active = useSelector(({ ui }: RootState) => ui.reviewsDrawerShowing);
  const dispatch = useDispatch();

  const onCloseDrawer = (): void => {
    dispatch(uiActions.setReviewsDrawerShowing(false));
  };

  return (
    <Drawer title='Reviews' open={active} onClose={() => onCloseDrawer()}>
      reviews
    </Drawer>
  );
};

export default ReviewDrawer;
