import React, { CSSProperties } from "react";

import "./LShape.scss";

import { CommonComponentProps, shapeDefaultProps, shapeStylePropsNames } from "../../defaultProps";
import useComponentCommon from "../../hooks/useComponentCommon";

interface LShapeProps extends Partial<CommonComponentProps> {
  isEditing?: boolean;
}

const LShape: React.FC<LShapeProps> = (props) => {
  const { styleProps, handleClick } = useComponentCommon(props, shapeStylePropsNames);

  return (
    <div
      style={styleProps as CSSProperties}
      className="l-shape-component"
      onClick={handleClick}
    />
  );
};

LShape.defaultProps = {
  ...shapeDefaultProps,
};

export default LShape;
