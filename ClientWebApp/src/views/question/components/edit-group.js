import React from "react";
import { ThunkDispatch } from "thunk-dispatch";

// Components

// Material
import { Tooltip } from "@material-ui/core";

import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

// API
import EditIcon from "@mui/icons-material/Edit";

import Modal from "components/core-components/Modal/modal";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import { IconButton } from "@mui/material";
import { addQuestionnaireGroupThunk } from "../api/question-thunk-api";
import { useParams } from "react-router-dom";
import { mainPrimaryColor } from "assets/theme/base/colors";

export default function EditGroup(props) {
  const { questionnaireGroupTemplateQuestionId, name } = props;

  const { t } = useTranslation(namespaces.question);

  const { control, errors, reset, watch } = useForm();

  const [show, setShow] = React.useState(false);
  let { id } = useParams();

  function onAddGroup(params) {
    if (watch("title"))
      ThunkDispatch(
        addQuestionnaireGroupThunk({
          name: watch("title"),
          id: Number(questionnaireGroupTemplateQuestionId),
          isEdit: Boolean(questionnaireGroupTemplateQuestionId),
          questionnaireTemplateId: id,
        })
      )
        .then((result) => {
          setShow(false);
          reset();
        })
        .catch((error) => console.error("addQuestionnaireGroupThunk", error))
        .finally(() => {});
  }

  return (
    <>
      {show ? (
        <Modal
          open={show}
          fullWidth
          showHeader={true}
          maxWidth={"sm"}
          description={
            <Controller
              name="title"
              control={control}
              defaultValue={name}
              error={!!errors?.title}
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
                  placeholder={t(translationKeys.template.title)}
                />
              )}
            />
          }
          title={t(translationKeys.question.editGroup)}
          variant={"delete"}
          dialogActions={[
            {
              color: "info",
              name: t(translationKeys.template.close),
              onClick: () => {
                setShow(false);
                reset();
              },
            },
            {
              name: t(translationKeys.template.save),
              variant: "contained",
              color: "info",
              onClick: () => onAddGroup(),
            },
          ]}
        ></Modal>
      ) : null}

      <Tooltip title={t(translationKeys.question.editGroup)}>
        <IconButton onClick={() => setShow(true)}>
          <EditIcon style={{ fill: mainPrimaryColor }} />
        </IconButton>
      </Tooltip>
    </>
  );
}
