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
import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
const useStyle = makeStyles({
  deleteIcon: {
    padding: "4px !important",
  },
});

function DeleteDoctor(props) {
  const { id } = props;

  const classes = useStyle(props);

  const { t } = useTranslation(namespaces.doctor);

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
        description={t(translationKeys.doctor.deleteMassage)}
        title={t(translationKeys.doctor.deleteDoctor)}
        variant={"delete"}
        dialogActions={[
          {
            name: t(translationKeys.doctor.close),
            onClick: () => setOpenDeleteDoctorModal(false),
          },
          {
            name: t(translationKeys.doctor.delete),
            variant: "contained",
            color: "primary",
            onClick: () => dispatchDeleteDoctorFunc(),
          },
        ]}
      ></Modal>
      <Tooltip title={t(translationKeys.doctor.delete)}>
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
