import { useSelector } from "react-redux";
import { IAppDirection } from "store/reducers/appReducer";
import { IRootReducer } from "store/reducers/rootReducer";

export function useIsRtl() {
  const direction = useSelector<IRootReducer>(
    (state) => state.app.direction
  ) as IAppDirection;

  return direction === "rtl";
}
