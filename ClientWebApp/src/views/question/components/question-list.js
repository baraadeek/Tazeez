import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "thunk-dispatch";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import PageBanner from "views/examples/Common/PageBanner";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";


// Material UI
import { Grid, CircularProgress, makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import GroupIcon from "@material-ui/icons/Group";

// Components
import Table from "components/core-components/Table/table";

// Constants
import { getQuestionListThunk } from "../api/question-thunk-api";
import { questionSelectors } from "../selectors/question-selectors";
import questionListViewStyle from "./question-list-view-style";
import { COLUMNS, QUESTION_TYPE_ID } from "../enums";

import { purge } from "../slice/question-slice";
import CardHeader from "components/core-components/card/CardHeader";
import CardIcon from "components/core-components/card/CardIcon";
import CardBody from "components/core-components/card/CardBody";
import CardComponent from "components/core-components/card/CardComponent";
import AddTemplateQuestion from "./add-temp-question";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";

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

  function renderDataTable(item, key) {
    let row = [];
    let rowColumn = [];

    const tableCellClasses = classes.tableCell;

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item.displayOrder}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.question}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {QUESTION_TYPE_ID[item.questionnaireQuestionTypeId]}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {moment(item.createdUTC).format("MMMM Do YYYY")}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {moment(item.lastUpdatedUTC).format("MMMM Do YYYY")}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item.score}
      </TableCell>
    );

    const choices = item.questionChoices.map((choice) => choice.choice);
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {choices?.join(", ")}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item.isOptional === false
          ? t(translationKeys.question.no)
          : t(translationKeys.question.yes)}
      </TableCell>
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
              <AddTemplateQuestion />
              {!false ? (
                <Table
                  renderDataTable={renderDataTable}
                  tableHead={COLUMNS.map((q) => t(translationKeys.question[q]))}
                  tableData={questionList}
                  emptyTable={t(translationKeys.question.available)}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
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
