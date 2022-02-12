import React, { useState } from "react";
import PropTypes from "prop-types";

// Icon
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Tooltip } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

//  Components
import Modal from "components/core-components/Modal/modal";
import GroupScoreModal from "./group-score-modal";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import { mainPrimaryColor } from "assets/theme/base/colors";
const useStyle = makeStyles({
  editIcon: {
    padding: "4px !important",
  },
});

function EditGroupScore(props) {
  const { id, groupTemplateId } = props;

  const classes = useStyle(props);

  const [openEditDoctorModal, setOpenEditDoctorModal] = useState(false);
  const { t } = useTranslation(namespaces.question);

  return (
    <React.Fragment>
      <Modal
        open={openEditDoctorModal}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={
          <GroupScoreModal
            groupTemplateId={groupTemplateId}
            setShow={(show) => {
              setOpenEditDoctorModal(show);
            }}
            id={id}
          />
        }
        title={t(translationKeys.question.editGroupScore)}
        variant={"delete"}
      ></Modal>
      <Tooltip title={t(translationKeys.question.editGroupScore)}>
        <IconButton
          onClick={() => setOpenEditDoctorModal(true)}
          className={classes.editIcon}
        >
          <EditIcon style={{ fill: mainPrimaryColor }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

EditGroupScore.propTypes = {
  id: PropTypes.number,
};

export default EditGroupScore;
