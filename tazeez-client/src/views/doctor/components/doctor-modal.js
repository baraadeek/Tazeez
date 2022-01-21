import React, { useCallback, useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

// Material
import { Grid, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";

// Styles
import AddTempQuestionStyle from "./add-temp-question-style";

// Components
import MDTypography from "components/core-components/MDTypography";
import MDButton from "components/core-components/MDButton";
import Slate from "components/core-components/TextEditor/uncontrolled-text-editer";

// Constants
import { USERS } from "../enums";

// API
import { addDoctorThunk, getUsersThunk } from "../api/doctor-thunk-api";
import { useSelector } from "react-redux";
import { htmlToDraftJs } from "components/core-components/TextEditor/utils";

const useStyle = makeStyles(AddTempQuestionStyle);

export default function DoctorModal(props) {
  const { setShow, id } = props;

  const doctor = useSelector((state) => state.doctor.doctorList.entities)[id];

  useEffect(() => {
    if (doctor?.description) {
      htmlToDraftJs(doctor.description, editorRef);
    }
  }, []);

  const { control, errors, reset, handleSubmit } = useForm();
  const usersList = useSelector((state) => state.doctor.users);

  const classes = useStyle();

  function getOptionLabel(option) {
    return option?.fullName || "";
  }
  const editorRef = React.useRef();

  const getUsers = useCallback(dispatchGetUsersThunkFunc, []);

  useEffect(
    (_) => {
      getUsers();
    },
    [getUsers]
  );

  async function dispatchGetUsersThunkFunc() {
    ThunkDispatch(getUsersThunk())
      .then((result) => {})
      .catch((error) => console.error("getUsersThunk", error))
      .finally(() => {});
  }

  const handleOnSubmit = (data) => {
    const item = {
      id: 0 || doctor?.id,
      ...data,
      userId: doctor?.userId || data.userId.id,
    };

    ThunkDispatch(addDoctorThunk(item))
      .then((result) => {
        setShow(false);
        reset();
      })
      .catch((error) => console.error("addDoctorThunk", error))
      .finally(() => {});
  };
  const dialogActions = [
    {
      name: "Close",
      onClick: () => {
        setShow(false);
        reset();
      },
    },
    {
      name: "Save",
      variant: "contained",
      color: "info",
      type: "submit",
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
              Specialist:
            </MDTypography>
            <Controller
              name="specialist"
              control={control}
              defaultValue={doctor?.specialist || ""}
              error={!!errors?.specialist}
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
            <MDTypography
              type="h5"
              fontSize={16}
              className={classNames(
                classes.containerGridChoices,
                classes.marginBottom
              )}
            >
              Users:
            </MDTypography>
            {doctor ? (
              <Controller
                name="fullName"
                control={control}
                defaultValue={doctor?.user.fullName || ""}
                error={!!errors?.fullName}
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    required
                    disabled
                    autoFocus
                    minLength={2}
                    autoComplete="off"
                  />
                )}
              />
            ) : (
              <Controller
                name="userId"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    freeSolo
                    autoHighlight
                    disableClearable
                    getOptionLabel={getOptionLabel}
                    value={value}
                    onChange={(_, data) => {
                      onChange(data);
                    }}
                    options={usersList.map((option) => option)}
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
            )}
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.marginBottom}
            >
              Description:
            </MDTypography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              error={!!errors?.question}
              rules={{
                validate: (val) => val?.trim().length >= 2,
              }}
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
