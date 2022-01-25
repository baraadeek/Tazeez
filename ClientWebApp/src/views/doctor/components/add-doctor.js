import React from "react";

// Material
import { Grid } from "@material-ui/core";

// Components
import Modal from "components/core-components/Modal/modal";
import MDButton from "components/core-components/MDButton";

// API
import DoctorModal from "./doctor-modal";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";

export default function AddDoctor() {
  const [show, setShow] = React.useState(false);

  const { t } = useTranslation(namespaces.doctor);

  return (
    <>
      <Modal
        open={show}
        fullWidth
        showHeader={true}
        maxWidth={"sm"}
        description={
          <DoctorModal
            setShow={(show) => {
              setShow(show);
            }}
          />
        }
        title={t(translationKeys.doctor.addDoctor)}
        variant={"delete"}
      ></Modal>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <MDButton
            onClick={() => setShow(true)}
            variant="contained"
            color="info"
          >
            {t(translationKeys.doctor.addDoctor)}
          </MDButton>
        </Grid>
      </Grid>
    </>
  );
}
