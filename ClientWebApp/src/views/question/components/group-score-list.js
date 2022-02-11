import React from "react";

// Material
import { Grid, makeStyles, Tooltip } from "@material-ui/core";

// Components
import Modal from "components/core-components/Modal/modal";
import MDButton from "components/core-components/MDButton";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import AddTempQuestionStyle from "./add-temp-question-style";
import { IconButton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import GroupList from "./group-list";

const useStyle = makeStyles(AddTempQuestionStyle);

export default function GroupScoreList(props) {
  const { groupTemplateId } = props;
  const [show, setShow] = React.useState(false);

  const { t } = useTranslation(namespaces.question);
  const classes = useStyle();

  const dialogActions = [
    {
      name: t(translationKeys.question.close),
      onClick: () => {
        setShow(false);
      },
    },
  ];
  return (
    <>
      <Modal
        open={show}
        fullWidth
        showHeader={true}
        maxWidth={"lg"}
        description={
          <>
            <GroupList
              groupTemplateId={groupTemplateId}
              setShow={(show) => {
                setShow(show);
              }}
            />
            <Grid container direction={"row"} justify={"flex-end"}>
              {dialogActions?.map((button, index) => (
                <Grid className={classes.buttonModal} item>
                  <MDButton
                    color={button.color || "dark"}
                    onClick={button?.onClick}
                    variant={button.variant || "outlined"}
                    type={button.type}
                  >
                    {button.name}
                  </MDButton>
                </Grid>
              ))}
            </Grid>
          </>
        }
        title={t(translationKeys.question.groupScoreList)}
        variant={"delete"}
      ></Modal>
      <Tooltip title={t(translationKeys.question.groupScoreList)}>
        <IconButton onClick={() => setShow(true)}>
          <FileCopyIcon style={{ fill: "#fb8c00" }} />
        </IconButton>
      </Tooltip>
    </>
  );
}
