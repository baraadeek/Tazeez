import { PAGE_DIRECTION } from "core-components/page-direction/enum/enum";
import { Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contactAPI } from "./api/contact-api";

export default function Contact() {
  const { handleSubmit, control, formState, reset } = useForm();
  const dispatch = useDispatch();

  const pageDirection = useSelector(
    (state) => state.pageDirection.pageDirection
  );

  let isAR = pageDirection === PAGE_DIRECTION.ar.key;

  const onSubmit = (data) => {
    console.log(data);
    reset({ userName: "", phoneNumber: "", email: "", message: "" });

    dispatch(contactAPI(data));
  };

  return (
    <div className="col-sm-6 col-lg-3">
      <div className="footer-item">
        <div className="footer-feedback">
          <h3>{isAR ? "تواصل" : "Feedback"}</h3>
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
                    placeholder={isAR ? "اسم المستخدم" : "User Name"}
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
                    placeholder={isAR ? "رقم الهاتف" : "Phone Number"}
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
                    placeholder={isAR ? "البريد الالكتروني" : "email"}
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
                    placeholder={isAR ? "الرسالة" : "Message"}
                  ></textarea>
                )}
              />
            </div>
            <div className="text-left">
              <button type="submit" className="btn feedback-btn">
                {formState.isSubmitting ? (
                  <Spinner animation="border" variant="light" />
                ) : isAR ? (
                  "إرسال"
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
