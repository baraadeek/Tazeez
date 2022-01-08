import React, { useCallback, useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Form, Spinner } from "react-bootstrap";

// core components
import TZButton from "components/tz-botton/tz-botton.js";
import { Controller, useForm } from "react-hook-form";
import { getUserThunk } from "core-components/profile/api/user-thunk-api";
import { useSelector } from "react-redux";
import { userSelectors } from "core-components/profile/selectors/user-selectors";
import { updateUserThunk } from "core-components/profile/api/user-thunk-api";

const Profile = () => {
  const data =
    localStorage.getItem("login") &&
    JSON.parse(localStorage.getItem("login"))?.response;

  const uploadInputRef = React.useRef(null);
  const user = useSelector(userSelectors)[0];
  console.log("🚀 ~ file: Profile.js ~ line 49 ~ Profile ~ user", user);

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
      const formData = new FormData();
      formData.append("file", file);
    }
  };

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    ThunkDispatch(updateUserThunk(data))
      .then((result) => {})
      .catch((error) => console.error("updateUserThunk", error))
      .finally(() => {});
  };

  return (
    <>
      {/* Page content */}
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
                        <img alt="..." className="rounded-circle" src={""} />{" "}
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
                      <TZButton color="info" size="small" type="submit">
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
                          <Input
                            value={user?.firstName}
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
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
                          <Input
                            value={user?.lastName}
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
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
                            defaultValue={user?.city}
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
                            defaultValue={user?.phoneNumber}
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
    </>
  );
};

export default Profile;
