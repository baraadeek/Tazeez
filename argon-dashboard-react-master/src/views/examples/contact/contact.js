import { Form, Spinner } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { contactAPI } from "./api/contact-api";

export default function Contact() {
  const { handleSubmit, control, formState, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    reset({ userName: "", phoneNumber: "", email: "", message: "" });

    dispatch(contactAPI(data));
  };

  return (
    <div className="col-sm-6 col-lg-3">
      <div className="footer-item">
        <div className="footer-feedback">
          <h3>Feedback</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <Controller
                name="userName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    required
                    autoComplete="off"
                    placeholder="User Name"
                  />
                )}
              />
            </div>
            <div className="form-group">
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    {...field}
                    required
                    autoComplete="off"
                    placeholder="Phone Number"
                  />
                )}
              />
            </div>
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
                    placeholder="email"
                  />
                )}
              />
            </div>

            <div className="form-group">
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="form-control"
                    id="your_message"
                    rows={3}
                    placeholder="Message"
                  ></textarea>
                )}
              />
            </div>
            <div className="text-left">
              <button type="submit" className="btn feedback-btn">
                {formState.isSubmitting ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "SUBMIT"
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
