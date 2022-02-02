import React from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

// Material
import { Grid, makeStyles } from "@material-ui/core";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

// Styles
import childrenModalStyle from "./children-modal-style";

// Components
import MDTypography from "components/core-components/MDTypography";
import MDButton from "components/core-components/MDButton";

// API
import { addChildrenThunk } from "../api/children-thunk-api";
import { useSelector } from "react-redux";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import MDAvatar from "components/core-components/MDAvatar";
import Account from "./account.png";
import { FormControlLabel, Switch } from "@mui/material";
import MDInputRoot from "components/core-components/MDInput/MDInputRoot";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const useStyle = makeStyles(childrenModalStyle);

export default function ChildrenModal(props) {
  const { setShow, id } = props;

  const children = useSelector((state) => state.children.childrenList.entities)[
    id
  ];
  const { t } = useTranslation(namespaces.children);

  const { control, errors, reset, handleSubmit, watch } = useForm();
  const [image, setImage] = React.useState("");
  const [gender, setGender] = React.useState(children?.gender);

  const classes = useStyle();
  const uploadInputRef = React.useRef(null);

  const handleOnSubmit = (data) => {
    ThunkDispatch(addChildrenThunk({ ...data, image, id: 0 || children?.id }))
      .then((result) => {
        setShow(false);
        reset();
      })
      .catch((error) => console.error("addChildrenThunk", error))
      .finally(() => {
        setShow(false);
        reset();
      });
  };
  const dialogActions = [
    {
      name: t(translationKeys.children.close),
      onClick: () => {
        setShow(false);
        reset();
      },
    },
    {
      name: t(translationKeys.children.save),
      variant: "contained",
      color: "info",
      type: "submit",
      id: 1,
    },
  ];

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file.size > 1024) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      //uploadImageThunk;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item>
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                uploadInputRef.current && uploadInputRef.current.click();
              }}
            >
              <MDAvatar
                bgColor="greyLight"
                src={(image.length ? image : children?.image) || Account}
                alt="profile-image"
                size="xl"
                shadow="sm"
              />
            </span>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.marginBottom}
            >
              {t(translationKeys.children.firstName)}
            </MDTypography>
            <Controller
              name="firstName"
              control={control}
              defaultValue={children?.firstName || ""}
              error={!!errors?.firstName}
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
          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.marginBottom}
            >
              {t(translationKeys.children.lastName)}
            </MDTypography>
            <Controller
              name="lastName"
              control={control}
              defaultValue={children?.lastName || ""}
              error={!!errors?.lastName}
              rules={{
                validate: (val) => val?.trim().length >= 2,
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  required
                  autoFocus
                  className={classes.marginBottom}
                  minLength={2}
                  autoComplete="off"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} className={classes.containerGridChoices}>
            <Grid item>
              <Controller
                name="birthDay"
                control={control}
                defaultValue={children?.birthDay || new Date()}
                error={!!errors?.birthDay}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      {...field}
                      maxDate={new Date()}
                      label={t(translationKeys.children.birthDay)}
                      inputFormat="MM/dd/yyyy"
                      renderInput={(params) => (
                        <MDInputRoot {...params} style={{ width: "100%" }} />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.containerGridChoices}>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.marginBottom}
            >
              {t(translationKeys.children.gender)}
            </MDTypography>
            <FormControlLabel
              control={
                <Controller
                  name={"gender"}
                  defaultValue={children?.gender || false}
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Switch
                        onChange={(e) => {
                          onChange(e.target.checked);
                          setGender(e.target.checked);
                        }}
                        checked={value}
                      />
                    );
                  }}
                />
              }
              label={
                gender
                  ? t(translationKeys.children.male)
                  : t(translationKeys.children.female)
              }
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
                    ? !(
                        watch &&
                        watch("firstName")?.length &&
                        watch("lastName")?.length &&
                        image?.length
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
