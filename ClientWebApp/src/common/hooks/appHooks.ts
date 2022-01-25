import { AppDirectionEnum } from "common/constants/directionEnum";
import { useSelector } from "react-redux";
import { IRootReducer } from "store/reducers/rootReducer";

export function useIsRtl() {
  const direction = useSelector<IRootReducer>(
    (state) => state.app.direction
  ) as AppDirectionEnum;

  return direction === "rtl";
}
