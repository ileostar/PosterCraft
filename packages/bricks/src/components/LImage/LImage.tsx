import React, { CSSProperties } from "react";

import "./LImage.scss";

import { CommonComponentProps, imageDefaultProps, imageStylePropsNames } from "../../defaultProps";
import useComponentCommon from "../../hooks/useComponentCommon";

interface LImageProps extends Partial<CommonComponentProps> {
  src?: string;
  isEditing?: boolean;
}

const LImage: React.FC<LImageProps> = ({ src, ...props }) => {
  const { styleProps, handleClick } = useComponentCommon(props, imageStylePropsNames);

  return (
    <img
      style={styleProps as CSSProperties}
      className="l-image-component"
      onClick={handleClick}
      src={src}
      alt=""
    />
  );
};

LImage.defaultProps = {
  ...imageDefaultProps,
};

export default LImage;
