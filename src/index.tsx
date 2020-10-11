import * as React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface DotTypingAnimationProps {
  style?: ViewStyle;
  dotStyles?: ViewStyle;
  dotColor?: string;
  dotMargin?: number;
  dotAmplitude?: number;
  dotSpeed?: number;
  show?: boolean;
  dotRadius?: number;
  dotY?: number;
  dotX?: number;
}

interface DotProps {
  x: number;
  y: number;
  radius: number;
}

interface AnimationParamProps {
  time: number;
  radius1: number;
  radius2: number;
  radius3: number;
}

export function DotTypingAnimation(props: DotTypingAnimationProps) {
  const {
    style = {},
    dotStyles = {},
    dotColor = "black",
    dotMargin = 3,
    dotAmplitude = 2,
    dotSpeed = 0.15,
    show = true,
    dotRadius = 2.5,
    dotY = 6,
    dotX = 12,
  } = props;
  const [animationParams, setAnimationParams] = React.useState<AnimationParamProps>({
    time: dotSpeed,
    radius1: dotRadius + dotAmplitude * Math.sin(0),
    radius2: dotRadius + dotAmplitude * Math.sin(-1),
    radius3: dotRadius + dotAmplitude * Math.sin(-2),
  });

  const frameAnimationRequest = React.useRef<number>();

  const getStyles = ({ x, y, radius }: DotProps) => ({
    left: x,
    top: y,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: dotColor,
  });

  const renderDot = (dotProps: DotProps) => <View style={[styles.dot, dotStyles, getStyles(dotProps)]} />;

  const animation = () => {
    setAnimationParams((prevAnimationParams) => ({
      radius1: dotRadius + dotAmplitude * Math.sin(prevAnimationParams.time),
      radius2: dotRadius + dotAmplitude * Math.sin(prevAnimationParams.time - 1),
      radius3: dotRadius + dotAmplitude * Math.sin(prevAnimationParams.time - 2),
      time: prevAnimationParams.time + dotSpeed,
    }));
    frameAnimationRequest.current = requestAnimationFrame(animation);
  };

  React.useEffect(() => {
    frameAnimationRequest.current = requestAnimationFrame(animation);
    return () => cancelAnimationFrame(frameAnimationRequest.current as number);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <View style={style}>
      {renderDot({
        x: dotX - dotRadius - dotMargin,
        y: dotY - animationParams.radius1,
        radius: animationParams.radius1,
      })}
      {renderDot({
        x: dotX,
        y: dotY - animationParams.radius2,
        radius: animationParams.radius2,
      })}
      {renderDot({
        x: dotX + dotRadius + dotMargin,
        y: dotY - animationParams.radius3,
        radius: animationParams.radius3,
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
  },
});
