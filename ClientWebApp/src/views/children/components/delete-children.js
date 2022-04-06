import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThunkDispatch } from "thunk-dispatch";

// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, Tooltip } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

//  Components
import Modal from "components/core-components/Modal/modal";
import { deleteChildrenThunk } from "../api/children-thunk-api";
import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";

const useStyle = makeStyles({
  deleteIcon: {
    padding: "4px !important",
  },
});

function DeleteChildren(props) {
  const { id } = props;

  const classes = useStyle(props);

  const { t } = useTranslation(namespaces.children);

  const [openDeleteChildrenModal, setOpenDeleteChildrenModal] = useState(false);

  //#region Dispatch functions
  /**
   * @function dispatchDeleteChildrenFunc
   * @description will delete Children.
   */
  async function dispatchDeleteChildrenFunc() {
    ThunkDispatch(deleteChildrenThunk({ id: id }))
      .then(() => {
        setOpenDeleteChildrenModal(false);
      })
      .finally(() => {});
  }
  //#endregion

  return (
    <React.Fragment>
      <Modal
        open={openDeleteChildrenModal}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={t(translationKeys.children.deleteMassage)}
        title={t(translationKeys.children.deleteChildren)}
        variant={"delete"}
        dialogActions={[
          {
            name: t(translationKeys.children.close),
            onClick: () => setOpenDeleteChildrenModal(false),
          },
          {
            name: t(translationKeys.children.delete),
            variant: "contained",
            color: "primary",
            onClick: () => dispatchDeleteChildrenFunc(),
          },
        ]}
      ></Modal>
      <Tooltip title={t(translationKeys.children.delete)}>
        <IconButton
          onClick={() => setOpenDeleteChildrenModal(true)}
          className={classes.deleteIcon}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

DeleteChildren.propTypes = {
  id: PropTypes.number,
};

export default DeleteChildren;
