import React from "react";
import TopHeader from "../TopHeader";
import Navbar from "../Navbar";
import PageBanner from "../PageBanner";
import Footer from "../Footer";
import { Form, Spinner } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-location";
import Alert from "@material-ui/lab/Alert";

interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { handleSubmit, control, formState } = useForm<ISignUpForm>();

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <TopHeader />
      <Navbar />
      <PageBanner
        pageTitle="Sign Up"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Sign Up"
        bgImage="page-title-one"
      />

      <div className="signup-area ptb-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 pl-0">
              <div className="signup-left">
                <img src="/images/signup-bg.jpg" alt="SignUp" />
              </div>
            </div>
            <div className="col-lg-6 ptb-100">
              <div className="signup-item">
                <div className="signup-head">
                  <h2>Sign Up Here</h2>
                  <p>
                    Already have an account?{" "}
                    <Link to="/login">
                      <a>Sign In</a>
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
                                placeholder="First Name"
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
                                placeholder="Last Name"
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
                                placeholder="Enter email"
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
                                placeholder="Enter Password"
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
                            ) : (
                              "Sign Up"
                            )}
                          </button>
                        </div>
                        <Alert severity="success" style={{ marginTop: 8 }}>
                          The account has been added successfully
                        </Alert>
                        <Alert severity="error" style={{ marginTop: 8 }}>
                          Error : Account already exists
                        </Alert>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
