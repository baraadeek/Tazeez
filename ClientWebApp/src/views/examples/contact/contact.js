// import { PAGE_DIRECTION } from "core-components/page-direction/enum/enum";
import { Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { contactAPI } from "./api/contact-api";

import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { handleSubmit, control, formState, reset } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation(namespaces.doctor);

  const onSubmit = (data) => {
    reset({ userName: "", phoneNumber: "", email: "", message: "" });

    dispatch(contactAPI(data));
  };

  return (
    <div className="col-sm-6 col-lg-3">
      <div className="footer-item">
        <div className="footer-feedback">
          <h3>{t(translationKeys.doctor.feedback)}</h3>
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
                    placeholder={t(translationKeys.doctor.name)}
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
                    placeholder={t(translationKeys.doctor.phoneNumber)}
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
                    placeholder={t(translationKeys.doctor.email)}
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
                    placeholder={t(translationKeys.doctor.message)}
                  ></textarea>
                )}
              />
            </div>
            <div className="text-left">
              <button type="submit" className="btn feedback-btn">
                {formState.isSubmitting ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  t(translationKeys.doctor.submit)
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
