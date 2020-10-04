import React, { useState, useEffect, useRef } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface TypingAnimationProps {
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
  bgColor: string;
  dotStyles: ViewStyle;
}

interface AnimationParamProps {
  time: number;
  y1: number;
  y2: number;
  y3: number;
}

export function TypingAnimation(props: TypingAnimationProps) {
  const {
    style = {},
    dotStyles = {},
    dotColor = "black",
    dotMargin = 3,
    dotAmplitude = 3,
    dotSpeed = 0.15,
    show = true,
    dotRadius = 2.5,
    dotY = 6,
    dotX = 12,
  } = props;
  const [animationParams, setAnimationParams] = useState<AnimationParamProps>({ time: 0, y1: 0, y2: 0, y3: 0 });

  const frameAnimationRequest = useRef<number>();

  const getStyles = ({ x, y, radius, bgColor }: DotProps) => ({
    left: x,
    top: y,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: bgColor,
  });

  const renderDot = (dotProps: DotProps) => (
    <View style={[styles.container, dotProps.dotStyles, getStyles(dotProps)]} />
  );

  const animation = () => {
    setAnimationParams((prevAnimationParams) => ({
      y1: dotY + dotAmplitude * Math.sin(prevAnimationParams.time),
      y2: dotY + dotAmplitude * Math.sin(prevAnimationParams.time - 1),
      y3: dotY + dotAmplitude * Math.sin(prevAnimationParams.time - 2),
      time: prevAnimationParams.time + dotSpeed,
    }));
    frameAnimationRequest.current = requestAnimationFrame(animation);
  };

  useEffect(() => {
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
        y: animationParams.y1,
        radius: dotRadius,
        dotStyles,
        bgColor: dotColor,
      })}
      {renderDot({ x: dotX, y: animationParams.y2, radius: dotRadius, dotStyles, bgColor: dotColor })}
      {renderDot({
        x: dotX + dotRadius + dotMargin,
        y: animationParams.y3,
        radius: dotRadius,
        dotStyles,
        bgColor: dotColor,
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
