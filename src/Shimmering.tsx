import React, {PureComponent} from 'react';
import {
  Animated,
  Dimensions,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  colors?: Array<string>;
  gradientStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle> & {width: number; height: number};
  duration?:number;
}
interface IState {
  viewWidth: number;
}

const GREY = 'rgb(234, 234, 234)';
const shimmeringAnimatedValue = new Animated.Value(0);
const ShimmringAnimation =(duration:number)=> Animated.loop(
  Animated.timing(shimmeringAnimatedValue, {
    useNativeDriver: false,
    delay: 1200,
    duration: duration,
    toValue: 1,
  }),
);
export default class Shimmering extends PureComponent<IProps, IState> {
  private readonly animation: Animated.CompositeAnimation;
  private gradientColors = [GREY, '#fff', GREY];

  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      viewWidth: -1,
    };

    this.animation = ShimmringAnimation(this.props?.duration ?? 700);
  }

  startAnimation() {
    this.animation.start();
  }

  render() {
    const {colors, gradientStyle, wrapperStyle} = this.props;
    const width = Dimensions.get('screen').width;
    const loadingStyle = {backgroundColor: GREY};
    const left = this._getLeftValue();
    return (
      <View
        style={{
          width: wrapperStyle?.width ?? width,
          height: wrapperStyle?.height ?? 80,
        }}>
        <View
          style={[styles.container, loadingStyle, wrapperStyle]}
          onLayout={event => this._onLayoutChange(event)}>
          <Animated.View
            style={[
              {
                  width: this.state.viewWidth*2,
                flex: 1,
                left,
              },
              gradientStyle,
            ]}>
            <LinearGradient
              colors={colors || this.gradientColors}
              start={{x: 0.3, y: 0.2}}
              end={{x: 0.8, y: 0.5}}
              style={{flex: 1}}
            />
          </Animated.View>
        </View>
      </View>
    );
  }

  private _onLayoutChange(event: LayoutChangeEvent) {
    this.setState({
      viewWidth: event.nativeEvent.layout.width,
    });

    this.startAnimation();
  }

  private _getLeftValue() {
    const {viewWidth} = this.state;
    return shimmeringAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-viewWidth, viewWidth],
    });
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});