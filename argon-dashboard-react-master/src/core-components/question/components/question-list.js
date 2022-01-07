import React from "react";
import MaterialTable from "material-table";
import { ThunkDispatch } from "thunk-dispatch";

// Components
import CustomInput from "components/CustomInput/CustomInput";

// API
import { addQuestionThunk } from "core-components/question/api/question-thunk-api";

// Material
import { Grid, makeStyles, Button, InputAdornment } from "@material-ui/core";
import { Card, Container, Row } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

// Icons
import Title from "@material-ui/icons/Title";

// Enum
import { tableIcons } from "../enums";

// Styles
import questionListViewStyle from "core-components/question/components/question-list-view-style";

const useStyle = makeStyles(questionListViewStyle);

export default function Questions() {
  const [state, setState] = React.useState({
    columns: [{ title: "name", field: "name" }],
    data: [],
  });
  const classes = useStyle();

  const [show, setShow] = React.useState(false);
  const [name, setName] = React.useState("");

  function onAddQuestion(params) {
    ThunkDispatch(addQuestionThunk({ name }))
      .then((result) => {
        setShow(false);
      })
      .catch((error) => console.error("addQuestionThunk", error))
      .finally(() => {});
  }

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-start"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShow(true)}
                  style={{ borderRadius: 20, margin: 8 }}
                >
                  Add New Question
                </Button>
              </Grid>
              <MaterialTable
                icons={tableIcons}
                title="Questions"
                columns={state.columns}
                data={state.data}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
