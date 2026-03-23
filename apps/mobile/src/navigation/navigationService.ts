import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const rootNavigate = (screen: string, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen as never, params as never);
  }
};

export const rootReset = (name: string) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index: 0, routes: [{ name: name as never }] });
  }
};
