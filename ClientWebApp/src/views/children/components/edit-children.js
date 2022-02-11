import React, { useState } from "react";
import PropTypes from "prop-types";

// Icon
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles, Tooltip } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";

//  Components
import Modal from "components/core-components/Modal/modal";
import ChildrenModal from "./children-modal";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";

const useStyle = makeStyles({
  editIcon: {
    padding: "4px !important",
  },
});

function EditChildren(props) {
  const { id } = props;

  const classes = useStyle(props);

  const [openEditChildrenModal, setOpenEditChildrenModal] = useState(false);
  const { t } = useTranslation(namespaces.children);

  return (
    <React.Fragment>
      <Modal
        open={openEditChildrenModal}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={
          <ChildrenModal
            setShow={(show) => {
              setOpenEditChildrenModal(show);
            }}
            id={id}
          />
        }
        title={t(translationKeys.children.editChildren)}
        variant={"delete"}
      ></Modal>
      <Tooltip title={t(translationKeys.children.editChildren)}>
        <IconButton
          onClick={() => setOpenEditChildrenModal(true)}
          className={classes.editIcon}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

EditChildren.propTypes = {
  id: PropTypes.number,
};

export default EditChildren;
