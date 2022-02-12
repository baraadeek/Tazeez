import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "thunk-dispatch";
import { useParams } from "react-router-dom";

// Material UI
import { Grid, CircularProgress, makeStyles } from "@material-ui/core";

import GroupIcon from "@material-ui/icons/Group";

// Components
import Table from "components/core-components/Table/table";

// Constants
import { getQuestionListThunk } from "../api/question-thunk-api";
import { questionSelectors } from "../selectors/question-selectors";
import questionListViewStyle from "./question-list-view-style";
import { COLUMNS } from "../enums";

import { purge } from "../slice/question-slice";
import CardHeader from "components/core-components/card/CardHeader";
import CardIcon from "components/core-components/card/CardIcon";
import CardBody from "components/core-components/card/CardBody";
import CardComponent from "components/core-components/card/CardComponent";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import QuestionItem from "./question-item";
import AddGroup from "./add-group";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import PageBanner from "views/examples/Common/PageBanner";

const useStyle = makeStyles(questionListViewStyle);

function QuestionList() {
  //#region hooks
  const classes = useStyle();
  let { id } = useParams();
  const dispatch = useDispatch();
  //#endregion

  const questionList = useSelector(questionSelectors);
  const { t } = useTranslation(namespaces.question);

  //#region Life Cycle
  const getQuestionList = useCallback(dispatchGetQuestionListFunc, []);

  useEffect(
    (_) => {
      getQuestionList();
    },
    [getQuestionList]
  );

  useEffect((_) => {
    return () => {
      dispatch(purge());
    };
  }, []);

  async function dispatchGetQuestionListFunc() {
    ThunkDispatch(getQuestionListThunk({ id }))
      .then((result) => {})
      .catch((error) => console.error("getQuestionListThunk", error))
      .finally(() => {});
  }

  //#endregion

  //#region Dispatch functions

  function renderDataTable(item, keyItem) {
    let row = [];
    let rowColumn = [];
    rowColumn.push(
      <>
        <QuestionItem item={item} classes={classes} />
      </>
    );

    row.push(rowColumn);
    return row;
  }

  return (
    <>
      <PageBanner
        pageTitle={t(translationKeys.question.questions)}
        homePageUrl={ROUTES_PATH_ENUM.Home}
        homePageText={t(translationKeys.common.homePage)}
        activePageText={t(translationKeys.question.questions)}
        bgImage="page-title-one"
      />
      <Grid container style={{ padding: 16 }}>
        <Grid item xs={12}>
          <CardComponent>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <GroupIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle} style={{ fontSize: 22 }}>
                {t(translationKeys.question.questions)}
              </h4>
            </CardHeader>
            <CardBody>
              <Grid item container justifyContent="flex-end">
                <Grid item>
                  <AddGroup />
                </Grid>
              </Grid>

              {!false ? (
                <Table
                  tableHeaderColor="primary"
                  renderDataTable={renderDataTable}
                  tableHead={COLUMNS.map((q) => t(translationKeys.question[q]))}
                  tableData={questionList}
                  emptyTable={t(translationKeys.question.available)}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  hover
                  customClassesForCells={[0, 4, 5]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 4, 5]}
                />
              ) : (
                <Grid
                  container
                  alignContent="center"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.minHeight}
                >
                  <CircularProgress
                    size={26}
                    className={classes.colorCircularProgress}
                  />
                </Grid>
              )}
            </CardBody>
          </CardComponent>
        </Grid>
      </Grid>
    </>
  );
}

export default QuestionList;
