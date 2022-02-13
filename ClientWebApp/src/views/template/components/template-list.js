import React, { useCallback, useEffect } from "react";
import { ThunkDispatch } from "thunk-dispatch";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Components
import moment from "moment";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Material
import { makeStyles, CircularProgress } from "@material-ui/core";

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
  deleteTemplateThunk,
  getTemplateListThunk,
} from "../api/template-thunk-api";
import Modal from "components/core-components/Modal/modal";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import MDButton from "components/core-components/MDButton";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import MDTypography from "components/core-components/MDTypography";

const useStyle = makeStyles(TemplateListStyle);

export default function TemplateList() {
  const { t } = useTranslation(namespaces.template);

  const classes = useStyle();
  const history = useHistory();

  const templateList = useSelector(templateSelectors);
  const isLoading = useSelector((state) => state.template.isLoading);

  const { control, errors, reset, watch } = useForm();
  const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

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
      ThunkDispatch(
        addTemplateThunk({
          name: watch("title"),
          id: selectedItem?.id || 0,
          isEdit: Boolean(selectedItem?.id),
        })
      )
        .then((result) => {
          setSelectedItem(null);
          setShow(false);
          reset();
        })
        .catch((error) => console.error("addTemplateThunk", error))
        .finally(() => {});
  }
  async function dispatchDeleteTemplateFunc() {
    ThunkDispatch(deleteTemplateThunk({ id: selectedItem?.id }))
      .then(() => {
        setOpenDeleteModal(false);
        setSelectedItem(null);
        setShow(false);
        reset();
      })
      .finally(() => {});
  }

  return (
    <>
      {openDeleteModal ? (
        <Modal
          open={openDeleteModal}
          fullWidth
          showHeader={true}
          maxWidth={"sm"}
          description={t(translationKeys.template.deleteMassage)}
          title={t(translationKeys.template.deleteTemplate)}
          variant={"delete"}
          dialogActions={[
            {
              name: t(translationKeys.template.close),
              onClick: () => setOpenDeleteModal(false),
            },
            {
              name: t(translationKeys.template.delete),
              variant: "contained",
              color: "primary",
              onClick: () => dispatchDeleteTemplateFunc(),
            },
          ]}
        ></Modal>
      ) : null}
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
              defaultValue={selectedItem?.name || ""}
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
                  placeholder={t(translationKeys.template.title)}
                />
              )}
            />
          }
          title={
            selectedItem?.name
              ? t(translationKeys.template.editTemplate)
              : t(translationKeys.template.add)
          }
          variant={"delete"}
          dialogActions={[
            {
              color: "info",
              name: t(translationKeys.template.close),
              onClick: () => {
                setShow(false);
                reset();
                setSelectedItem(null);
              },
            },
            {
              name: t(translationKeys.template.save),
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
        gap={2}
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
              mr={2}
              gap
              className={classes.gridButton}
            >
              <MDButton
                type="submit"
                className={classes.button}
                variant="contained"
                color="info"
                onClick={() => setShow(true)}
              >
                {t(translationKeys.template.add)}
              </MDButton>
            </Grid>
            {templateList.map((item) => {
              return (
                <Grid item xl={3} md={4} sm={6} xs={12} key={item.id}>
                  <ComplexStatisticsCard
                    mr={2}
                    onClickEdit={() => {
                      setShow(true);
                      setSelectedItem(item);
                    }}
                    onClickDelete={() => {
                      setOpenDeleteModal(true);
                      setSelectedItem(item);
                    }}
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
            <Card
              onClick={() => setShow(true)}
              style={{ height: 100, justifyContent: "center" }}
            >
              <MDTypography variant="h4" textAlign={"center"}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {t(translationKeys.template.add)}
                </Grid>
              </MDTypography>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
}
