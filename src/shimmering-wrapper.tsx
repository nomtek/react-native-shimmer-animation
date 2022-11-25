import React from 'react';
import { View } from 'react-native';
import {
  AnimatedPlaceholderProps,
  ShimmeringPlaceholder,
} from './shimmering-placeholder';

type Props = {
  visible: boolean;
} & AnimatedPlaceholderProps;

export const ShimmeringWrapper: React.FC<Props> = ({
  children,
  visible,
  ...props
}) => {
  return (
    <View>
      {visible && <>{children}</>}
      {!visible && <ShimmeringPlaceholder {...props} />}
    </View>
  );
};
