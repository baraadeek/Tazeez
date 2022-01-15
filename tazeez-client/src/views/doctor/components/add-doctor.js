import React from "react";

// Material
import { Grid } from "@material-ui/core";

// Components
import Modal from "components/core-components/Modal/modal";
import MDButton from "components/core-components/MDButton";

// API
import DoctorModal from "./doctor-modal";

export default function AddDoctor() {
  const [show, setShow] = React.useState(false);

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
        title={"Add Doctor"}
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
            variant={"contained"}
            color={"info"}
          >
            Add New Doctor
          </MDButton>
        </Grid>
      </Grid>
    </>
  );
}
