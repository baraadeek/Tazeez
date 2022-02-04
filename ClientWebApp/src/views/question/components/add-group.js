import React from "react";
import { ThunkDispatch } from "thunk-dispatch";

// Components

// Material
import { Grid } from "@material-ui/core";

import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

// API

import Modal from "components/core-components/Modal/modal";
import MDButton from "components/core-components/MDButton";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import { addQuestionnaireGroupThunk } from "../api/question-thunk-api";
import { useParams } from "react-router-dom";

export default function AddGroup() {
  const { t } = useTranslation(namespaces.question);

  const { control, errors, reset, watch } = useForm();

  const [show, setShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  let { id } = useParams();

  function onAddGroup(params) {
    if (watch("title"))
      ThunkDispatch(
        addQuestionnaireGroupThunk({
          name: watch("title"),
          id: selectedItem?.id || 0,
          isEdit: Boolean(selectedItem?.id),
          questionnaireTemplateId: id,
        })
      )
        .then((result) => {
          setSelectedItem(null);
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
              defaultValue={selectedItem?.name || ""}
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
          title={
            selectedItem?.name
              ? t(translationKeys.template.addGroup)
              : t(translationKeys.question.addGroup)
          }
          variant={"delete"}
          dialogActions={[
            {
              color: "info",
              name: t(translationKeys.template.close),
              onClick: () => {
                setShow(false);
                reset();
                setSelectedItem(null);
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
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <MDButton
            onClick={() => setShow(true)}
            variant="contained"
            color="info"
          >
            {t(translationKeys.question.addGroup)}
          </MDButton>
        </Grid>
      </Grid>
    </>
  );
}
