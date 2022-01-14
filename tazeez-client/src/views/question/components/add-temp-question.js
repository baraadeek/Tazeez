import React from "react";

// Material
import { Grid, TextField } from "@material-ui/core";

// Styles
import MDButton from "components/core-components/MDButton";

import { Form } from "react-bootstrap";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Modal from "components/core-components/Modal/modal";
import MDTypography from "components/core-components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import { QUESTION_TYPE } from "../enums";

export default function AddTemplateQuestion() {
  const { control, errors, reset, watch } = useForm();
  const [show, setShow] = React.useState(false);
  const [showChoice, setShowChoice] = React.useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices",
  });
  function getOptionLabel(option) {
    return option?.title || "";
  }

  function renderChoices(index) {
    return (
      <Grid container xs={12}>
        <Grid item xs={12} style={{ padding: 4 }}>
          <MDTypography type="h5" fontSize={16} style={{ marginBottom: 8 }}>
            Choice:
          </MDTypography>
          <Controller
            name={`Choice${index}`}
            control={control}
            defaultValue=""
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
              />
            )}
          />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6} style={{ padding: 4 }}>
            <MDTypography
              type="h5"
              fontSize={16}
              style={{ marginBottom: 8, marginTop: 8 }}
            >
              Score choice:
            </MDTypography>
            <Controller
              name={`Score${index}`}
              control={control}
              defaultValue=""
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
                />
              )}
            />
          </Grid>
          <Grid item xs={6} style={{ padding: 4 }}>
            <MDTypography
              type="h5"
              fontSize={16}
              style={{ marginBottom: 8, marginTop: 8 }}
            >
              Order choice:
            </MDTypography>
            <Controller
              name={`Order${index}`}
              control={control}
              defaultValue=""
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
              <Grid container xs={12}>
                <Grid item xs={12} style={{ padding: 4 }}>
                  <MDTypography
                    type="h5"
                    fontSize={16}
                    style={{ marginBottom: 8 }}
                  >
                    Question Name:
                  </MDTypography>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
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
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={6} style={{ padding: 4 }}>
                  <MDTypography
                    type="h5"
                    fontSize={16}
                    style={{ marginBottom: 8, marginTop: 8 }}
                  >
                    Score:
                  </MDTypography>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} style={{ padding: 4 }}>
                  <MDTypography
                    type="h5"
                    fontSize={16}
                    style={{ marginBottom: 8, marginTop: 8 }}
                  >
                    Order:
                  </MDTypography>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
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
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={12} style={{ padding: 4 }}>
                  <MDTypography
                    type="h5"
                    fontSize={16}
                    style={{ marginBottom: 8 }}
                  >
                    Question Type:
                  </MDTypography>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    error={!!errors?.title}
                    rules={{
                      validate: (val) => val?.trim().length >= 2,
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
                    justify="flex-end"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <MDButton
                        style={{ padding: 0, marginRight: 4 }}
                        onClick={() => append({ value: "" })}
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
            </>
          }
          title={"Add New Question"}
          variant={"delete"}
          dialogActions={[
            { name: "Close", onClick: () => setShow(false) },
            {
              name: "Save",
              variant: "contained",
              color: "info",
              onClick: () => {},
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
