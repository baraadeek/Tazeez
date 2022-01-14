import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// Material ui
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Box,
  DialogActions,
  Grid,
  makeStyles,
  Divider,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import SuccessIcon from "@material-ui/icons/CheckCircleOutlineSharp";
import CloseIcon from "@material-ui/icons/Close";

// Core component
import MDButton from "../MDButton";
import ModalStyle from "./modal-style";

// Utils
import MDTypography from "../MDTypography";

// Consts

const useStyles = makeStyles(ModalStyle);

const Modal = (props) => {
  const timerToken = useRef(null);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function scrollContainerRef(scrollContainer) {
    const scroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    scrollContainer.scrollTo(0, scroll);
  }

  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles(props);
  const {
    title,
    description,
    variant,
    fullWidth,
    maxWidth,
    open,
    keepMounted,
    onClose,
    children,
    dialogActions,
    icon,
    closeButton,
    showHeader,
    scrollToBottom,
    defaultTitle,
  } = props;

  function onRef(ref) {
    if (ref) {
      if (scrollToBottom) {
        setTimeout(() => {
          scrollContainerRef(ref);
        }, 1000);
      }
      props.onRef && props.onRef(ref);
    }
  }

  useEffect(() => {
    if (open) {
      timerToken.current = setTimeout(() => {
        setIsLoading(false);
      }, 700);
    } else {
      setIsLoading(true);
    }

    return () => {
      if (timerToken.current) {
        clearTimeout(timerToken.current);
        timerToken.current = null;
      }
    };
  }, [open]);

  const closeButtonIcon = (
    <Grid item style={{ paddingBottom: 4 }}>
      <IconButton size="small" aria-label="close" onClick={() => onClose()}>
        <CloseIcon />
      </IconButton>
    </Grid>
  );

  const renderHeader = (param) => (
    <DialogTitle classes={{ root: classes.rootDialogTitle }}>
      <Box display="flex" className={classes.height}>
        <Grid
          container
          direction="row"
          justify={
            title?.length || (defaultTitle?.length && isLoading)
              ? "space-between"
              : "flex-end"
          }
          alignItems="center"
        >
          {title || (defaultTitle?.length && isLoading) ? (
            <Grid item>
              <Grid container alignItems={"center"} style={{ height: 32 }}>
                <Grid item style={{ marginRight: 10 }}>
                  <SuccessIcon classes={{ root: classes.iconClass }} />
                </Grid>
                <Grid item style={{ marginBottom: -4 }}>
                  <MDTypography
                    className={classes.titleColor}
                    type={"h3"}
                    overFlow
                  >
                    {title || defaultTitle}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {closeButton ? closeButtonIcon : null}
        </Grid>
      </Box>
      <Grid sm={12}>
        <Divider />
      </Grid>
    </DialogTitle>
  );

  const renderContent = () => (
    <Grid item md={12}>
      <MDTypography type={"h3"}>{description}</MDTypography>
    </Grid>
  );

  return open ? (
    <Dialog
      disableScrollLock
      fullWidth={fullWidth}
      maxWidth={maxWidth || "sm"}
      open={open}
      transition={Transition}
      keepMounted={keepMounted}
      disableEscapeKeyDown
      onClose={onClose}
      aria-labelledby="modal-slide-title"
      aria-describedby="modal-slide-description"
    >
      {showHeader ? renderHeader() : null}
      <DialogContent
        ref={(ref) => {
          onRef(ref);
        }}
        classes={{ root: !dialogActions && classes.rootDialogContent }}
      >
        {description && dialogActions ? (
          renderContent()
        ) : isLoading ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.circularContainer}
          >
            <CircularProgress size={24}></CircularProgress>
          </Grid>
        ) : (
          children
        )}
      </DialogContent>
      {dialogActions?.length ? (
        <DialogActions classes={{ root: classes.rootDialogActions }}>
          <Grid container direction={"row"} justify={"flex-end"}>
            {dialogActions?.map((button, index) => (
              <Grid style={{ marginRight: 3, marginLeft: 3 }} item>
                <MDButton
                  color={button.color || "dark"}
                  onClick={button.onClick}
                  variant={button.variant || "outlined"}
                >
                  {button.name}
                </MDButton>
              </Grid>
            ))}
          </Grid>
        </DialogActions>
      ) : null}
    </Dialog>
  ) : null;
};

Modal.defaultProps = {
  keepMounted: true,
  icon: null,
  closeButton: false,
  dialogActions: [],
  showHeader: true,
  title: "",
};

Modal.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  open: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func,
  dialogActions: PropTypes.array,
  titleColor: PropTypes.string,
  closeButton: PropTypes.bool,
  scrollToBottom: PropTypes.bool,
  showHeader: PropTypes.bool,
  onRef: PropTypes.func,
  defaultTitle: PropTypes.bool,
};

export default Modal;
