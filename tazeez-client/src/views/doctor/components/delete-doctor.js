import React, { useState } from "react";
import PropTypes from "prop-types";

// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";

//  Components
import Modal from "components/core-components/Modal/modal";
import { ThunkDispatch } from "thunk-dispatch";

const useStyle = makeStyles({
  deleteIcon: {
    padding: "4px !important",
  },
});

function DeleteDoctor(props) {
  const { data, dispatchDeleteDoctor } = props;

  const classes = useStyle(props);

  const [openDeleteDoctorModal, setOpenDeleteDoctorModal] = useState(false);

  //#region Dispatch functions
  /**
   * @function dispatchDeleteDoctorFunc
   * @description will delete Doctor.
   */
  async function dispatchDeleteDoctorFunc() {
    ThunkDispatch(dispatchDeleteDoctor(data))
      .then(() => {
        setOpenDeleteDoctorModal(false);
      })
      .finally(() => {});
  }
  //#endregion

  return (
    <React.Fragment>
      <Modal
        open={openDeleteDoctorModal}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={"Do you want to delete this Doctor?"}
        title={"Delete Doctor"}
        variant={"delete"}
        dialogActions={[
          { name: "Close", onClick: () => setOpenDeleteDoctorModal(false) },
          {
            name: "Delete",
            variant: "contained",
            color: "primary",
            onClick: () => dispatchDeleteDoctorFunc(),
          },
        ]}
      ></Modal>
      <Tooltip title="delete">
        <IconButton
          onClick={() => setOpenDeleteDoctorModal(true)}
          className={classes.deleteIcon}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

DeleteDoctor.propTypes = {
  id: PropTypes.number,
};

export default DeleteDoctor;
