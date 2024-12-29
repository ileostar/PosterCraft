import { pick } from "lodash-es";
import { useMemo } from "react";

import { CommonComponentProps } from "../defaultProps";

interface UseComponentCommonProps extends Partial<CommonComponentProps> {
  isEditing?: boolean;
}

const useComponentCommon = (props: UseComponentCommonProps, picks: string[]) => {
  const styleProps = useMemo(() => pick(props, picks), [props, picks]);

  const handleClick = () => {
    if (props.actionType === "url" && props.url && !props.isEditing) {
      window.location.href = props.url;
    }
  };

  return {
    styleProps,
    handleClick,
  };
};

export default useComponentCommon;
