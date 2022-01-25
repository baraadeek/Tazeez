// @mui material components
import React, { useCallback, useEffect } from "react";

import Grid from "@mui/material/Grid";

import { CardHeader, FormGroup, Input, Row, Col } from "reactstrap";

// Overview page components
import Header from "./components/Header";
import MDBox from "components/core-components/MDBox";
import MDTypography from "components/core-components/MDTypography";
import { ThunkDispatch } from "thunk-dispatch";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { userSelectors } from "./selectors/user-selectors";
import { getUserThunk, updateUserThunk } from "./api/user-thunk-api";
import { makeStyles } from "@material-ui/core";
import ProfileStyle from "./profile-style";
import MDButton from "components/core-components/MDButton";
import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";

const useStyles = makeStyles(ProfileStyle);

function Overview() {
  const [image, setImage] = React.useState("");

  const user = useSelector(userSelectors)[0];

  const auth = useSelector((state) => state.auth.user);

  const get = useCallback(dispatchGetFunc, []);
  const { t } = useTranslation(namespaces.profile);

  useEffect(
    (_) => {
      get();
    },
    [get]
  );

  async function dispatchGetFunc() {
    ThunkDispatch(getUserThunk({ id: auth?.id }))
      .then((result) => {})
      .catch((error) => console.error("getUserThunk", error))
      .finally(() => {});
  }

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    ThunkDispatch(
      updateUserThunk({ ...data, image: image.length ? image : user.image })
    )
      .then((result) => {
        //setDisplayImage(result.data.image);
      })
      .catch((error) => console.error("updateUserThunk", error))
      .finally(() => {});
  };
  const classes = useStyles();

  return (
    <Header
      onChange={(data) => {
        setImage(data);
      }}
    >
      <MDBox mt={1} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} xl={12}>
            {user ? (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginTop: 8 }} className="bg-white border-0">
                  <MDButton
                    type="submit"
                    variant="contained"
                    color="info"
                    className={classes.editProfile}
                  >
                    {t(translationKeys.profile.editProfile)}
                  </MDButton>
                </div>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <MDTypography
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {t(translationKeys.profile.email)} &nbsp;
                        </MDTypography>

                        <Input
                          value={user?.email}
                          className="form-control-alternative"
                          id="input-email"
                          placeholder="jesse@example.com"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <MDTypography
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {t(translationKeys.profile.firstName)} &nbsp;
                        </MDTypography>

                        <Controller
                          name="firstName"
                          control={control}
                          defaultValue={user.firstName}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              className="form-control-alternative"
                              autoComplete="off"
                              type="text"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <MDTypography
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {t(translationKeys.profile.lastName)} &nbsp;
                        </MDTypography>

                        <Controller
                          name="lastName"
                          control={control}
                          defaultValue={user.lastName}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              className="form-control-alternative"
                              autoComplete="off"
                              type="text"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />
                {/* Address */}
                <MDTypography
                  variant="h6"
                  fontWeight="medium"
                  textTransform="capitalize"
                >
                  {t(translationKeys.profile.contactInformation)}
                </MDTypography>

                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <MDTypography
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {t(translationKeys.profile.city)} &nbsp;
                        </MDTypography>
                        <Controller
                          name="city"
                          control={control}
                          defaultValue={user.city}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              className="form-control-alternative"
                              autoComplete="off"
                              type="text"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="6">
                      <FormGroup>
                        <MDTypography
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {t(translationKeys.profile.phoneNumber)} &nbsp;
                        </MDTypography>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          defaultValue={user.phoneNumber}
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              className="form-control-alternative"
                              autoComplete="off"
                              type="number"
                            />
                          )}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              </Form>
            ) : null}
          </Grid>
        </Grid>
      </MDBox>
    </Header>
  );
}

export default Overview;
