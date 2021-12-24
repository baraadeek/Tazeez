import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-location";
import { loginValidationSchema } from "./validationSchema";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { control, handleSubmit, formState } = useForm<ILoginForm>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    console.log({ data });
  };

  return (
    <Container>
      <Row>
        <Col xs md={{ span: 4, offset: 4 }}>
          <h3 className="mt-5">Sign in to your account</h3>
          <p className="mb-5 mt-3">
            Don't have an account? <Link to="/signup">sign up</Link>
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    required
                    autoFocus
                    autoComplete="off"
                    type="email"
                    placeholder="Enter email"
                  />
                )}
              />
            </Form.Group>
            {/* PASSWORD */}
            <Form.Group className="mb-5" controlId="password">
              <Form.Label>Password</Form.Label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    required
                    autoComplete="off"
                    type="password"
                    placeholder="Enter Password"
                  />
                )}
              />
            </Form.Group>
            {/* LOGIN BUTTON */}
            <div className="d-grid">
              <Button type="submit">
                {formState.isSubmitting ? <Spinner animation="border" variant="light" /> : "Login"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
