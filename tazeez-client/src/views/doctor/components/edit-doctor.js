import React, { useState } from "react";
import PropTypes from "prop-types";

// Icon
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Tooltip } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

//  Components
import Modal from "components/core-components/Modal/modal";
import DoctorModal from "./doctor-modal";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
const useStyle = makeStyles({
  editIcon: {
    padding: "4px !important",
  },
});

function EditDoctor(props) {
  const { id } = props;

  const classes = useStyle(props);

  const [openEditDoctorModal, setOpenEditDoctorModal] = useState(false);
  const { t } = useTranslation(namespaces.doctor);

  return (
    <React.Fragment>
      <Modal
        open={openEditDoctorModal}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={
          <DoctorModal
            setShow={(show) => {
              setOpenEditDoctorModal(show);
            }}
            id={id}
          />
        }
        title={t(translationKeys.doctor.editDoctor)}
        variant={"delete"}
      ></Modal>
      <Tooltip title={t(translationKeys.doctor.editDoctor)}>
        <IconButton
          onClick={() => setOpenEditDoctorModal(true)}
          className={classes.editIcon}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

EditDoctor.propTypes = {
  id: PropTypes.number,
};

export default EditDoctor;
