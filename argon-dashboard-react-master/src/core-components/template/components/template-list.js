import React, { useCallback, useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { useDispatch, useSelector } from "react-redux";

// Components
import CustomInput from "components/CustomInput/CustomInput";
import TypographyComponent from "components/typography/typography.js";
import CardComponent from "components/card/card";
// API

// Material
import {
  Grid,
  makeStyles,
  InputAdornment,
  Badge,
  CircularProgress,
} from "@material-ui/core";

import SweetAlert from "react-bootstrap-sweetalert";

// Icons
import Title from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";

// Enum
import { EMPTY_TEMPLATE_VIEW_TEXT } from "core-components/template/enums";

// API
import {
  addTemplateThunk,
  getTemplateListThunk,
} from "core-components/template/api/template-thunk-api";

// Selector
import { templateSelectors } from "core-components/template/selectors/template-selectors";

// Styles
import TemplateListStyle from "core-components/template/components/template-list-style";
import { updateIsLoading } from "../slice/template-slice";
import TZCard from "components/tz-card/tz-card";

const useStyle = makeStyles(TemplateListStyle);

export default function TemplateList() {
  const classes = useStyle();

  const templateList = useSelector(templateSelectors);
  const isLoading = useSelector((state) => state.template.isLoading);

  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const [name, setName] = React.useState("");

  const getTemplateList = useCallback(dispatchGetTemplateListFunc, []);

  useEffect(
    (_) => {
      getTemplateList();
    },
    [getTemplateList]
  );

  async function dispatchGetTemplateListFunc() {
    ThunkDispatch(getTemplateListThunk())
      .then((result) => {
        dispatch(updateIsLoading(false));
      })
      .catch((error) => console.error("getTemplateListThunk", error))
      .finally(() => {});
  }

  function onAddQuestion(params) {
    ThunkDispatch(addTemplateThunk({ name }))
      .then((result) => {
        setShow(false);
      })
      .catch((error) => console.error("addTemplateThunk", error))
      .finally(() => {});
  }

  return (
    <>
      {show ? (
        <SweetAlert
          title=""
          onConfirm={onAddQuestion}
          onCancel={() => {
            setShow(false);
          }}
          confirmBtnCssClass={classes.button + classes.save}
          cancelBtnCssClass={classes.button}
          confirmBtnText="Save"
          cancelBtnText="Cancel"
          showCancel
        >
          <CustomInput
            labelText={<span>Title</span>}
            id="title"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => setName(event.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <Title />
                </InputAdornment>
              ),
            }}
          />
        </SweetAlert>
      ) : null}

      <Grid
        container
        className={classes.containerGrid}
        direction="row"
        spacing={3}
        style={{ padding: 16 }}
      >
        {isLoading ? (
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            className={classes.noData}
            xs={12}
          >
            <CircularProgress size={30} />
          </Grid>
        ) : templateList && templateList.length > 0 ? (
          <>
            {templateList.map((item) => {
              return (
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <TZCard
                    icon={<DescriptionIcon />}
                    title={`${item.numberOfQuestions || 9} Q`}
                    count={item.name}
                    percentage={{
                      label: "than last month",
                    }}
                  />
                </Grid>
              );
            })}
            <Grid item xl={3} md={4} sm={6} xs={12}>
              <TZCard
                style={{
                  height: 116,
                  border: "1px dashed",
                  "justify-content": "center",
                  display: "flex",
                  "justify-items": "center",
                  paddingTop: 20,
                }}
                count={"Add New Template"}
                onClick={() => setShow(true)}
              />
            </Grid>
          </>
        ) : (
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            className={classes.noData}
            xs={12}
          >
            <TypographyComponent type="h4" fontSize={16}>
              {EMPTY_TEMPLATE_VIEW_TEXT}
            </TypographyComponent>
          </Grid>
        )}
      </Grid>
    </>
  );
}