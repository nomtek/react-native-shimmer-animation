import React from 'react';
import { View, ViewStyle } from 'react-native';
import {
  AnimatedPlaceholderProps,
  ShimmeringPlaceholder,
} from './shimmering-placeholder';

type Props = {
  visible: boolean;
  style?: ViewStyle;
} & AnimatedPlaceholderProps;

export const ShimmeringWrapper: React.FC<Props> = ({
  children,
  visible,
  style,
  ...props
}) => {
  return (
    <View style={style}>
      {visible && <>{children}</>}
      {!visible && <ShimmeringPlaceholder {...props} />}
    </View>
  );
};
