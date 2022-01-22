import React, { useCallback, useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Components
import moment from "moment";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Material
import { Grid, makeStyles, CircularProgress } from "@material-ui/core";

import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";

// Icons
import DescriptionIcon from "@material-ui/icons/Description";

// Selector
import { templateSelectors } from "../selectors/template-selectors";

// Slice
import { updateIsLoading } from "../slice/template-slice";

// Styles
import TemplateListStyle from "./template-list-style";

// API
import {
  addTemplateThunk,
  getTemplateListThunk,
} from "../api/template-thunk-api";
import Modal from "components/core-components/Modal/modal";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import MDButton from "components/core-components/MDButton";

const useStyle = makeStyles(TemplateListStyle);

export default function TemplateList() {
  const classes = useStyle();
  const history = useHistory();

  const templateList = useSelector(templateSelectors);
  const isLoading = useSelector((state) => state.template.isLoading);

  const { control, errors, reset, watch } = useForm();
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);

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

  function onAddNewTemplate(params) {
    if (watch("title"))
      ThunkDispatch(addTemplateThunk({ name: watch("title") }))
        .then((result) => {
          setShow(false);
          reset();
        })
        .catch((error) => console.error("addTemplateThunk", error))
        .finally(() => {});
  }

  return (
    <>
      {show ? (
        <Modal
          open={show}
          fullWidth
          showHeader={true}
          maxWidth={"sm"}
          description={
            <Controller
              name="title"
              control={control}
              defaultValue=""
              error={!!errors?.title}
              rules={{
                validate: (val) => val?.trim().length >= 2,
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  required
                  autoFocus
                  minLength={2}
                  autoComplete="off"
                  placeholder={"Title"}
                />
              )}
            />
          }
          title={"Add New Template"}
          variant={"delete"}
          dialogActions={[
            { name: "Close", onClick: () => setShow(false) },
            {
              name: "Save",
              variant: "contained",
              color: "info",
              onClick: () => onAddNewTemplate(),
            },
          ]}
        ></Modal>
      ) : null}
      <Grid
        container
        className={classes.containerGrid}
        direction="row"
        spacing={3}
      >
        {isLoading ? (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            className={classes.noData}
            xs={12}
          >
            <CircularProgress size={30} />
          </Grid>
        ) : templateList && templateList.length > 0 ? (
          <>
            <Grid
              container
              direction="row"
              justifyContent={"flex-end"}
              alignItems="center"
              spacing={1}
              mr={2}
              className={classes.gridButton}
            >
              <MDButton
                type="submit"
                className={classes.button}
                onClick={() => setShow(true)}
              >
                Add New Template
              </MDButton>
            </Grid>
            {templateList.map((item) => {
              return (
                <Grid item xl={3} md={4} sm={6} xs={12}>
                  <ComplexStatisticsCard
                    mr={2}
                    onClick={() => {
                      history.push(
                        ROUTES_PATH_ENUM.QuestionsTemplate.replace(
                          ":id",
                          item.id
                        )
                      );
                    }}
                    icon={<DescriptionIcon />}
                    title={`${
                      item.numberOfQuestions === undefined
                        ? 0
                        : item.numberOfQuestions
                    } Q`}
                    count={item.name}
                    percentage={{
                      label: moment(item.createdDate).format("MMMM Do YYYY"),
                    }}
                  />
                </Grid>
              );
            })}
          </>
        ) : (
          <Grid item xl={3} md={4} sm={6} xs={12}>
            {
              <ComplexStatisticsCard
                mr={0}
                style={{ textAlign: "center" }}
                isCenter={true}
                count={"Add New Template"}
                onClick={() => setShow(true)}
              />
            }
          </Grid>
        )}
      </Grid>
    </>
  );
}
