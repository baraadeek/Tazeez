/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React base styles
import colors from "components/theme/base/colors";
import breakpoints from "components/theme/base/breakpoints";
import typography from "components/theme/base/typography";
import boxShadows from "components/theme/base/boxShadows";
import borders from "components/theme/base/borders";
import globals from "components/theme/base/globals";

// Material Dashboard 2 PRO React helper functions
import boxShadow from "components/theme/functions/boxShadow";
import hexToRgb from "components/theme/functions/hexToRgb";
import linearGradient from "components/theme/functions/linearGradient";
import pxToRem from "components/theme/functions/pxToRem";
import rgba from "components/theme/functions/rgba";

// Material Dashboard 2 React components base styles for @mui material components
import sidenav from "components/theme/components/sidenav";
import list from "components/theme/components/list";
import listItem from "components/theme/components/list/listItem";
import listItemText from "components/theme/components/list/listItemText";
import card from "components/theme/components/card";
import cardMedia from "components/theme/components/card/cardMedia";
import cardContent from "components/theme/components/card/cardContent";
import button from "components/theme/components/button";
import iconButton from "components/theme/components/iconButton";
import input from "components/theme/components/form/input";
import inputLabel from "components/theme/components/form/inputLabel";
import inputOutlined from "components/theme/components/form/inputOutlined";
import textField from "components/theme/components/form/textField";
import menu from "components/theme/components/menu";
import menuItem from "components/theme/components/menu/menuItem";
import switchButton from "components/theme/components/form/switchButton";
import divider from "components/theme/components/divider";
import tableContainer from "components/theme/components/table/tableContainer";
import tableHead from "components/theme/components/table/tableHead";
import tableCell from "components/theme/components/table/tableCell";
import linearProgress from "components/theme/components/linearProgress";
import breadcrumbs from "components/theme/components/breadcrumbs";
import slider from "components/theme/components/slider";
import avatar from "components/theme/components/avatar";
import tooltip from "components/theme/components/tooltip";
import appBar from "components/theme/components/appBar";
import tabs from "components/theme/components/tabs";
import tab from "components/theme/components/tabs/tab";
import stepper from "components/theme/components/stepper";
import step from "components/theme/components/stepper/step";
import stepConnector from "components/theme/components/stepper/stepConnector";
import stepLabel from "components/theme/components/stepper/stepLabel";
import stepIcon from "components/theme/components/stepper/stepIcon";
import select from "components/theme/components/form/select";
import formControlLabel from "components/theme/components/form/formControlLabel";
import formLabel from "components/theme/components/form/formLabel";
import checkbox from "components/theme/components/form/checkbox";
import radio from "components/theme/components/form/radio";
import autocomplete from "components/theme/components/form/autocomplete";
import container from "components/theme/components/container";
import popover from "components/theme/components/popover";
import buttonBase from "components/theme/components/buttonBase";
import icon from "components/theme/components/icon";
import svgIcon from "components/theme/components/svgIcon";
import link from "components/theme/components/link";
import dialog from "components/theme/components/dialog";
import dialogTitle from "components/theme/components/dialog/dialogTitle";
import dialogContent from "components/theme/components/dialog/dialogContent";
import dialogContentText from "components/theme/components/dialog/dialogContentText";
import dialogActions from "components/theme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
