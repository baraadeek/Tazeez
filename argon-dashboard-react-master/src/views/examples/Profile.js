import React, { useCallback, useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Form } from "react-bootstrap";

// core components
import TZButton from "components/tz-botton/tz-botton.js";
import { Controller, useForm } from "react-hook-form";
import { getUserThunk } from "core-components/profile/api/user-thunk-api";
import { useSelector } from "react-redux";
import { userSelectors } from "core-components/profile/selectors/user-selectors";
import { updateUserThunk } from "core-components/profile/api/user-thunk-api";

import { makeStyles } from "@material-ui/core";

import UserStyle from "./Profile-style";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles(UserStyle);

const Profile = () => {
  const classes = useStyles();

  const [image, setImage] = React.useState("");
  const [displayImage, setDisplayImage] = React.useState("");

  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;

  const uploadInputRef = React.useRef(null);
  const user = useSelector(userSelectors)[0];

  const get = useCallback(dispatchGetFunc, []);

  useEffect(
    (_) => {
      get();
    },
    [get]
  );

  async function dispatchGetFunc() {
    ThunkDispatch(getUserThunk({ id: data.id }))
      .then((result) => {})
      .catch((error) => console.error("getUserThunk", error))
      .finally(() => {});
  }

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

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    ThunkDispatch(
      updateUserThunk({ ...data, image: image.length ? image : user.image })
    )
      .then((result) => {
        setDisplayImage(result.data.image);
      })
      .catch((error) => console.error("updateUserThunk", error))
      .finally(() => {});
  };

  return (
    <>
      {user ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container fluid>
            <Row>
              <Col
                className="order-xl-2 mb-5 mb-xl-0"
                xl="4"
                style={{ marginTop: 44 }}
              >
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <input
                          ref={uploadInputRef}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleFileInput}
                        />
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            uploadInputRef.current &&
                              uploadInputRef.current.click();
                          }}
                        >
                          <UserAvatar
                            showName
                            users={[
                              {
                                ...user,
                                image: displayImage.length
                                  ? displayImage
                                  : user.image,
                              },
                            ]}
                            showFullName
                            className={classes.avatar}
                            typographyType={"h1"}
                          />
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <CardBody className="pt-0 pt-md-4">
                    <div className="text-center">
                      <h3>{user?.firstName + " " + user?.lastName}</h3>

                      <hr className="my-4" />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">My account</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                        <TZButton
                          color="info"
                          size="small"
                          type="submit"
                          style={{ background: "#0046c0" }}
                        >
                          Edit Profile
                        </TZButton>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
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
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
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
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
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
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
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
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Phone Number
                            </label>

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
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Form>
      ) : null}
    </>
  );
};

export default Profile;
