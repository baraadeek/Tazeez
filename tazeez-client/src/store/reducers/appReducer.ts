import { Action } from "redux";

export interface IAppReducerAction extends Action {
  type: string;
  value: any | string | "rtl" | "ltr";
}

const initialState = {
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: true,
  sidenavColor: "info",
  transparentNavbar: false,
  fixedNavbar: true,
  openConfigurator: false,
  direction: "ltr",
  layout: "dashboard",
  darkMode: false,
};

export type IAppDirection = "rtl" | "ltr";

export type IAppReducerState = {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: IAppDirection;
  layout: string;
  darkMode: boolean;
};

export default function appReducer(
  state = initialState,
  action: IAppReducerAction
) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value as IAppDirection };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value as boolean };
    }
    default:
      return state;
  }
}
