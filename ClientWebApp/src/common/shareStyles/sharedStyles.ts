
const sharedStyles = {
  disabled: {
    "pointer-events": "none",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    opacity: 0.45,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  verticalAlignMiddle: {
    verticalAlign: "middle",
  },
  removeSidePadding: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  removeMargin: {
    margin: "0 !important",
  },
  removePaperEffect: {
    boxShadow: "none",
    border: "1px solid whitesmoke",
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  get fullDimensions() {
   return {
     ...this.fullHeight,
     ...this.fullWidth
   } 
  },
} as const;


export type ISharedStylesKeys = keyof typeof sharedStyles;

export default sharedStyles;
