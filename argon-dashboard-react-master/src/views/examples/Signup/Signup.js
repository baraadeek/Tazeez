import React from "react";

import { Form, Spinner } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { SiginUpAPI } from "./api/sigin-api";
import { useDispatch } from "react-redux";
import PageBanner from "../Common/PageBanner";
import SignupImage from "views/examples/images/signup-bg.jpg";
import { useSelector } from "react-redux";
import { PAGE_DIRECTION } from "core-components/page-direction/enum/enum";
export default function SignUp() {
  const { handleSubmit, control, formState } = useForm();
  const dispatch = useDispatch();
  const [showError, SetShowError] = React.useState(null);

  const pageDirection = useSelector(
    (state) => state.pageDirection.pageDirection
  );

  let isAR = pageDirection === PAGE_DIRECTION.ar.key;
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      SiginUpAPI(data)
        .then((response) => {
          if (response?.status !== 200) {
            SetShowError(response?.message);
          } else {
            SetShowError("");
          }
        })
        .catch((error) => {
          SetShowError(error?.message);
        })
    );
  };

  return (
    <>
      <PageBanner
        pageTitle={isAR ? "اشتراك" : "Sign Up"}
        homePageUrl="/auth/home"
        homePageText={isAR ? "الصفحة الرئيسية" : "Home"}
        activePageText={isAR ? "اشتراك" : "Sign Up"}
        bgImage="page-title-one"
      />

      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="signup-left">
                <img src={SignupImage} alt="SignUp" />
              </div>
            </div>
            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>{isAR ? "سجل هنا" : "Sign Up Here"}</h2>
                  <p>
                    {isAR ? "هل لديك حساب؟" : "Already have an account?"}{" "}
                    <Link to="/auth/login">
                      {isAR ? "تسجيل الدخول " : "Login"}
                    </Link>
                  </p>
                </div>

                <div className="signup-form">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoFocus
                                autoComplete="off"
                                placeholder={
                                  isAR ? "الاسم الاول" : "First Name"
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoComplete="off"
                                placeholder={
                                  isAR ? "الاسم الاخير" : "Last Name"
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                autoComplete="off"
                                type="email"
                                placeholder={
                                  isAR
                                    ? "أدخل البريد الإلكتروني"
                                    : "Enter email"
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                required
                                maxLength={32}
                                minLength={10}
                                autoComplete="off"
                                type="password"
                                placeholder={
                                  isAR ? "أدخل الرقم السري " : "Enter Password"
                                }
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-center">
                          <button type="submit" className="btn signup-btn">
                            {formState.isSubmitting ? (
                              <Spinner animation="border" variant="light" />
                            ) : isAR ? (
                              "تسجيل"
                            ) : (
                              "Sign Up"
                            )}
                          </button>
                        </div>
                        {showError !== null ? (
                          !showError ? (
                            <Alert severity="success" style={{ marginTop: 8 }}>
                              The account has been added successfully
                            </Alert>
                          ) : (
                            <Alert severity="error" style={{ marginTop: 8 }}>
                              {`Error : ${showError}`}
                            </Alert>
                          )
                        ) : null}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
