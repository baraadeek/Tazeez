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
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const isMounted = useRef(true);
  const [state, setState] = useState<S>(initialState);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const onSetState = useCallback(function (state) {
    if (isMounted.current) {
      setState(state);
    }
  }, []);

  return [state, onSetState];
}
