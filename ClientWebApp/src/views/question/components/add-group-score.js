import React from "react";

// Material
import { Tooltip } from "@material-ui/core";

// Components
import Modal from "components/core-components/Modal/modal";

// API
import GroupScoreModal from "./group-score-modal";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import { IconButton } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { mainPrimaryColor } from "assets/theme/base/colors";

export default function AddGroupScore(props) {
  const { groupTemplateId } = props;
  const [show, setShow] = React.useState(false);

  const { t } = useTranslation(namespaces.question);

  return (
    <>
      <Modal
        open={show}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={
          <GroupScoreModal
            groupTemplateId={groupTemplateId}
            setShow={(show) => {
              setShow(show);
            }}
          />
        }
        title={t(translationKeys.question.groupScore)}
        variant={"delete"}
      ></Modal>
      <Tooltip title={t(translationKeys.question.groupScore)}>
        <IconButton onClick={() => setShow(true)}>
          <AddToPhotosIcon style={{ fill: mainPrimaryColor }} />
        </IconButton>
      </Tooltip>
    </>
  );
}
