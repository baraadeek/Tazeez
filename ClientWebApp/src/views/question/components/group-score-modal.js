import React, { useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

// Material
import { Grid, makeStyles } from "@material-ui/core";

// Styles
import AddTempQuestionStyle from "./add-temp-question-style";

// Components
import MDTypography from "components/core-components/MDTypography";
import MDButton from "components/core-components/MDButton";
import Slate from "components/core-components/TextEditor/uncontrolled-text-editer";

// API
import { useSelector } from "react-redux";
import { htmlToDraftJs } from "components/core-components/TextEditor/utils";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import { addGroupScoreThunk } from "../api/question-thunk-api";

const useStyle = makeStyles(AddTempQuestionStyle);

export default function GroupScoreModal(props) {
  const { setShow, id, groupTemplateId } = props;

  const groupScore = useSelector(
    (state) => state.groupScore.groupScoreList.entities
  )[id];

  const { t } = useTranslation(namespaces.question);

  useEffect(() => {
    if (groupScore?.scoreDecription) {
      htmlToDraftJs(groupScore.scoreDecription, editorRef);
    }
  }, []);

  const { control, errors, reset, handleSubmit, watch } = useForm();

  const classes = useStyle();

  const editorRef = React.useRef();

  const handleOnSubmit = (data) => {
    const item = {
      id: 0 || groupScore?.id,
      ...data,
      groupTemplateId: groupTemplateId,
    };

    ThunkDispatch(addGroupScoreThunk(item))
      .then((result) => {
        setShow(false);
        reset();
      })
      .catch((error) => console.error("addGroupScoreThunk", error))
      .finally(() => {});
  };
  const dialogActions = [
    {
      name: t(translationKeys.doctor.close),
      onClick: () => {
        setShow(false);
        reset();
      },
    },
    {
      name: t(translationKeys.doctor.save),
      variant: "contained",
      color: "info",
      type: "submit",
      id: 1,
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <Grid container xs={12}>
          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.marginBottom}
            >
              {t(translationKeys.question.name)}
            </MDTypography>
            <Controller
              name="name"
              control={control}
              defaultValue={groupScore?.name || ""}
              error={!!errors?.name}
              rules={{
                validate: (val) => val?.trim().length >= 2,
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  required
                  autoFocus
                  minLength={2}
                  autoComplete="off"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography type="h5" fontSize={16} className={classes.margin}>
              {t(translationKeys.question.score)}
            </MDTypography>
            <Controller
              name="score"
              control={control}
              defaultValue={groupScore?.score || ""}
              error={!!errors?.score}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  required
                  type="number"
                  minLength={1}
                  autoComplete="off"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.marginBottom}
            >
              {t(translationKeys.doctor.description)}
            </MDTypography>
            <Controller
              name="scoreDecription"
              control={control}
              defaultValue={groupScore?.scoreDecription}
              render={({ field: { value, onChange } }) => (
                <Slate
                  forwardRef={(ref) => {
                    editorRef.current = ref;
                  }}
                  onChange={() => {
                    const updatedValue = draftToHtml(
                      convertToRaw(editorRef.current.value.getCurrentContent())
                    );

                    if (updatedValue !== "<p></p>\n") {
                      onChange(updatedValue);
                    } else {
                      onChange("");
                    }
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction={"row"}
          justify={"flex-end"}
          className={classes.save}
        >
          {dialogActions?.map((button, index) => (
            <Grid className={classes.buttonModal} item>
              <MDButton
                color={button.color || "dark"}
                onClick={button?.onClick}
                variant={button.variant || "outlined"}
                type={button.type}
                disabled={
                  button.id === 1
                    ? id
                      ? false
                      : !(
                          watch &&
                          watch("name")?.length &&
                          watch("score")?.length
                        )
                    : false
                }
              >
                {button.name}
              </MDButton>
            </Grid>
          ))}
        </Grid>
      </form>
    </>
  );
}
