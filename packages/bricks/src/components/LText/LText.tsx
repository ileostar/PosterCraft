import React, { CSSProperties } from "react";

import "./LText.scss";

import { CommonComponentProps, textDefaultProps, textStylePropNames } from "../../defaultProps";
import useComponentCommon from "../../hooks/useComponentCommon";

interface LTextProps extends Partial<CommonComponentProps> {
  tag?: keyof JSX.IntrinsicElements;
  text?: string;
  isEditing?: boolean;
}

const LText: React.FC<LTextProps> = ({ tag = "div", text, ...props }) => {
  const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);

  return (
    <div
      style={styleProps as CSSProperties}
      className="l-text-component"
      onClick={handleClick}
    >
      {text}
    </div>
  );
};

// 设置默认属性
LText.defaultProps = {
  ...textDefaultProps,
};

export default LText;
