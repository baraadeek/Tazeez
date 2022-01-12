import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "thunk-dispatch";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

// Material UI
import { Grid, CircularProgress, makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import GroupIcon from "@material-ui/icons/Group";

// Components
import Table from "components/tz-table/tz-table";

// Constants

import { getQuestionListThunk } from "../api/question-thunk-api";
import { questionSelectors } from "../selectors/question-selectors";
import questionListViewStyle from "./question-list-view-style";
import { COLUMNS, QUESTION_TYPE_ID } from "../enums";
import CardComponent from "components/card/CardComponent";
import CardBody from "components/card/CardBody";
import CardIcon from "components/card/CardIcon";
import CardHeader from "components/card/CardHeader";
import { purge } from "../slice/question-slice";

const useStyle = makeStyles(questionListViewStyle);

function QuestionList() {
  //#region hooks
  const classes = useStyle();
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  //#endregion

  const questionList = useSelector(questionSelectors);

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
    ThunkDispatch(getQuestionListThunk({ id: history.location.state.state.id }))
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
        {item.isOptional === false ? "No" : "Yes"}
      </TableCell>
    );
    row.push(rowColumn);
    return row;
  }

  return (
    <Grid container style={{ padding: 16 }}>
      <Grid item xs={12}>
        <CardComponent>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <GroupIcon />
            </CardIcon>
            <h4 className={classes.cardIconTitle} style={{ fontSize: 22 }}>
              Questions
            </h4>
          </CardHeader>
          <CardBody>
            {!false ? (
              <Table
                renderDataTable={renderDataTable}
                tableHead={COLUMNS}
                tableData={questionList}
                emptyTable={"No Questions available!"}
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
                justify="center"
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
  );
}

export default QuestionList;
