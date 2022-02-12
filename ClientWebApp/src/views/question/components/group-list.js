import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "thunk-dispatch";

// Material UI
import { Grid, makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";

// Components
import Table from "components/core-components/Table/table";

// Constants
import questionListViewStyle from "./question-list-view-style";
import { COLUMNS_GROUP_SCORE } from "../enums";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import { getGroupScoreThunk } from "../api/question-thunk-api";
import { groupScoreAdapterSelectors } from "../selectors/question-selectors";
import { purge } from "../slice/group-score-slice";
import EditGroupScore from "./edit-group-score";

const useStyle = makeStyles(questionListViewStyle);

function GroupList(props) {
  const { groupTemplateId } = props;

  //#region hooks
  const classes = useStyle();
  const dispatch = useDispatch();
  //#endregion

  const groupScore = useSelector(groupScoreAdapterSelectors);

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
    ThunkDispatch(getGroupScoreThunk({ id: groupTemplateId }))
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
        {item?.name}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.score}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        <div
          dangerouslySetInnerHTML={{
            __html: item?.scoreDecription,
          }}
        />
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        <Grid container justify="flex-end" direction="row" alignItems="center">
          <EditGroupScore id={item.id} groupTemplateId={groupTemplateId} />
        </Grid>
      </TableCell>
    );

    row.push(rowColumn);
    return row;
  }

  return (
    <Grid container style={{ padding: 16 }}>
      <Grid item xs={12}>
        <Table
          renderDataTable={renderDataTable}
          tableHead={COLUMNS_GROUP_SCORE.map((d) =>
            t(translationKeys.question[d])
          )}
          tableData={groupScore}
          emptyTable={t(translationKeys.question.availableGroupScore)}
          customCellClasses={[classes.center, classes.right, classes.right]}
          customClassesForCells={[0, 4, 5]}
          customHeadCellClasses={[classes.center, classes.right, classes.right]}
          customHeadClassesForCells={[0, 4, 5]}
        />
      </Grid>
    </Grid>
  );
}

export default GroupList;
