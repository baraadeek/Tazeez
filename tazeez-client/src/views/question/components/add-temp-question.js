import React from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { Form } from "react-bootstrap";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import classNames from "classnames";

// Material
import {
  FormControlLabel,
  Grid,
  makeStyles,
  Switch,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

// Styles
import AddTempQuestionStyle from "./add-temp-question-style";

// Components
import Modal from "components/core-components/Modal/modal";
import MDTypography from "components/core-components/MDTypography";
import MDButton from "components/core-components/MDButton";

// Constants
import { QUESTION_TYPE } from "../enums";

// API
import { addQuestionThunk } from "../api/question-thunk-api";

const useStyle = makeStyles(AddTempQuestionStyle);

export default function AddTemplateQuestion() {
  const { control, errors, reset, handleSubmit, watch } = useForm();

  const classes = useStyle();

  const [show, setShow] = React.useState(false);
  const [showChoice, setShowChoice] = React.useState(false);
  const [ShowError, SetShowError] = React.useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionChoices",
  });

  function getOptionLabel(option) {
    return option?.title || "";
  }

  const handleOnSubmit = (data) => {
    const { questionChoices } = data;

    const question = {
      templateId: 1,
      ...data,
      questionnaireQuestionTypeId: data.questionnaireQuestionTypeId.type,
    };

    if (
      !questionChoices.length &&
      (data.questionnaireQuestionTypeId.type === 1 ||
        data.questionnaireQuestionTypeId.type === 2)
    ) {
      SetShowError(true);
    } else {
      SetShowError(false);
      ThunkDispatch(addQuestionThunk(question))
        .then((result) => {
          setShow(false);
          reset();
        })
        .catch((error) => console.error("addQuestionThunk", error))
        .finally(() => {});
    }
  };
  const dialogActions = [
    {
      name: "Close",
      onClick: () => {
        setShow(false);
        reset();
        SetShowError(false);
        setShowChoice(false);
      },
    },
    {
      name: "Save",
      variant: "contained",
      color: "info",
      type: "submit",
    },
  ];

  function renderChoices(index) {
    return (
      <Grid container xs={12} className={classes.containerChoices}>
        <Grid item xs={12} className={classes.containerGridChoices}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <MDTypography type="h5" fontSize={16} className={classes.Choice}>
                Choice:
              </MDTypography>
            </Grid>
            <Grid item>
              <MDButton
                classes={{ root: classes.buttonDelete }}
                onClick={() => remove(index)}
                variant={"contained"}
                color={"primary"}
              >
                delete
              </MDButton>
            </Grid>
          </Grid>
          <Controller
            name={`questionChoices.${index}.choice`}
            control={control}
            defaultValue=""
            error={!!errors?.choice}
            rules={{
              validate: (val) => val?.trim().length >= 2,
            }}
            render={({ field: { value, onChange } }) => (
              <Form.Control
                value={value}
                onChange={onChange}
                required
                autoFocus
                minLength={2}
                autoComplete="off"
              />
            )}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6} className={classes.containerGridChoices}>
            <MDTypography type="h5" fontSize={16} className={classes.margin}>
              Score choice:
            </MDTypography>

            <Controller
              name={`questionChoices.${index}.score`}
              control={control}
              defaultValue=""
              error={!!errors?.title}
              rules={{
                validate: (val) => val?.trim().length >= 1,
              }}
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
          <Grid item xs={6} className={classes.containerGridChoices}>
            <MDTypography type="h5" fontSize={16} className={classes.margin}>
              Order choice:
            </MDTypography>
            <Controller
              name={`questionChoices.${index}.displayOrder`}
              control={control}
              defaultValue=""
              error={!!errors?.title}
              rules={{
                validate: (val) => val?.trim().length >= 1,
              }}
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
      </Grid>
    );
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
            <>
              <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
                <Grid container xs={12}>
                  <Grid item xs={12} className={classes.containerGridChoices}>
                    <MDTypography
                      type="h5"
                      fontSize={16}
                      className={classes.marginBottom}
                    >
                      Question Name:
                    </MDTypography>
                    <Controller
                      name="question"
                      control={control}
                      defaultValue=""
                      error={!!errors?.question}
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
                  <Grid item xs={6} className={classes.containerGridChoices}>
                    <MDTypography
                      type="h5"
                      fontSize={16}
                      className={classes.margin}
                    >
                      Score:
                    </MDTypography>
                    <Controller
                      name="score"
                      control={control}
                      defaultValue=""
                      error={!!errors?.score}
                      rules={{
                        validate: (val) => val?.trim().length >= 1,
                      }}
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
                  <Grid item xs={6} className={classes.containerGridChoices}>
                    <MDTypography
                      type="h5"
                      fontSize={16}
                      className={classes.margin}
                    >
                      Order:
                    </MDTypography>
                    <Controller
                      name="displayOrder"
                      control={control}
                      defaultValue=""
                      error={!!errors?.displayOrder}
                      rules={{
                        validate: (val) => val?.trim().length >= 1,
                      }}
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
                      Optional:
                    </MDTypography>
                    <FormControlLabel
                      control={
                        <Controller
                          name={"isOptional"}
                          control={control}
                          render={({ field: { value, onChange } }) => {
                            return (
                              <Switch
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                }}
                                checked={value}
                              />
                            );
                          }}
                        />
                      }
                      label={watch("isOptional") ? "Yes" : "No"}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12}>
                  <Grid item xs={12} className={classes.containerGridChoices}>
                    <MDTypography
                      type="h5"
                      fontSize={16}
                      className={classNames(
                        classes.containerGridChoices,
                        classes.marginBottom
                      )}
                    >
                      Question Type:
                    </MDTypography>
                    <Controller
                      name="questionnaireQuestionTypeId"
                      control={control}
                      defaultValue=""
                      error={!!errors?.questionnaireQuestionTypeId.title}
                      rules={{
                        validate: (val) => val.title?.trim().length >= 1,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <Autocomplete
                          freeSolo
                          autoHighlight
                          disableClearable
                          getOptionLabel={getOptionLabel}
                          value={value}
                          onChange={(_, data) => {
                            if (data.type === 1 || data.type === 2) {
                              setShowChoice(true);
                            }
                            onChange(data);
                          }}
                          options={QUESTION_TYPE.map((option) => option)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              minLength={1}
                              variant="outlined"
                              InputProps={{
                                ...params.InputProps,
                                type: "search",
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                {showChoice ? (
                  <>
                    <Grid
                      container
                      direction="row"
                      justify={ShowError ? "space-between" : "flex-end"}
                      alignItems="center"
                      spacing={1}
                    >
                      {ShowError ? (
                        <Grid item>
                          <MDTypography
                            type="h5"
                            fontSize={16}
                            className={classes.massage}
                          >
                            You must add choices
                          </MDTypography>
                        </Grid>
                      ) : null}
                      <Grid item>
                        <MDButton
                          classes={{ root: classes.append }}
                          onClick={() => {
                            append({
                              displayOrder: "",
                              choice: "",
                              score: "",
                            });
                          }}
                          variant={"contained"}
                          color={"info"}
                        >
                          +
                        </MDButton>
                      </Grid>
                    </Grid>
                    {fields.map((item, index) => renderChoices(index))}
                  </>
                ) : null}
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
                      >
                        {button.name}
                      </MDButton>
                    </Grid>
                  ))}
                </Grid>
              </form>
            </>
          }
          title={"Add New Question"}
          variant={"delete"}
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
            variant={"contained"}
            color={"info"}
          >
            Add New Question
          </MDButton>
        </Grid>
      </Grid>
    </>
  );
}
