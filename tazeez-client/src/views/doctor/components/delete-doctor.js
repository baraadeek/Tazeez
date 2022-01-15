import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThunkDispatch } from "thunk-dispatch";

// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, Tooltip } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

//  Components
import Modal from "components/core-components/Modal/modal";
import { deleteDoctorThunk } from "../api/doctor-thunk-api";

const useStyle = makeStyles({
  deleteIcon: {
    padding: "4px !important",
  },
});

function DeleteDoctor(props) {
  const { id } = props;
  console.log("🚀 ~ file: delete-doctor.js ~ line 21 ~ DeleteDoctor ~ id", id);

  const classes = useStyle(props);

  const [openDeleteDoctorModal, setOpenDeleteDoctorModal] = useState(false);

  //#region Dispatch functions
  /**
   * @function dispatchDeleteDoctorFunc
   * @description will delete Doctor.
   */
  async function dispatchDeleteDoctorFunc() {
    ThunkDispatch(deleteDoctorThunk({ id: id }))
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
