import { useBoolean } from '@chakra-ui/react';
import useBreakpointValue from './useBreakpointValue';
import * as React from 'react';

export const useMobileMenuState = () => {
  const [isOpen, actions] = useBoolean();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  React.useEffect(() => {
    if (isMobile == false) {
      actions.off();
    }
  }, [isMobile, actions]);

  return { isOpen, ...actions };
};
