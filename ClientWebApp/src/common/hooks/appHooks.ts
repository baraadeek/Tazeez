import { AppDirectionEnum } from "common/constants/directionEnum";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { IRootReducer } from "store/reducers/rootReducer";

export function useIsRtl() {
  const direction = useSelector<IRootReducer>(
    (state) => state.app.direction
  ) as AppDirectionEnum;

  return direction === "rtl";
}

export function useMountedState<S>(
  initialState?: undefined | S | (() => S)
): [S, Dispatch<SetStateAction<S>>, boolean] {
  const isMounted = useRef(true);
  const isStateChanged = useRef(false);
  const [state, setState] = useState<S>(initialState!);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const onSetState = useCallback(function (state) {
    if (isMounted.current) {
      setState(state);
      isStateChanged.current = true;
    }
  }, []);

  return [state, onSetState, isStateChanged.current];
}

export const useFlexDirection = (): [
  "row" | "row-reverse",
  "column" | "column-reverse"
] => {
  const isRtl = useIsRtl();

  return [isRtl ? "row-reverse" : "row", isRtl ? "column-reverse" : "column"];
};
