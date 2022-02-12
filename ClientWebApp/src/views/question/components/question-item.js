import React from "react";

import moment from "moment";

// Material UI
import { Grid, Tooltip } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";

// Components

// Constants
import { COLUMNS_ITEM, QUESTION_TYPE_ID } from "../enums";

import AddTemplateQuestion from "./add-temp-question";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import AddGroupScore from "./add-group-score";
import { Box, Collapse, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Table from "components/core-components/Table/table";
import MDTypography from "components/core-components/MDTypography";
import EditGroup from "./edit-group";
import GroupScoreList from "./group-score-list";

function QuestionItem(props) {
  const { item, classes } = props;

  const { t } = useTranslation(namespaces.question);

  const [open, setOpen] = React.useState(false);

  function renderDataTable(itemKey, key) {
    let row = [];
    let rowColumn = [];

    const tableCellClasses = classes.tableCell;

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {itemKey.displayOrder}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {itemKey?.question}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {QUESTION_TYPE_ID[itemKey.questionnaireQuestionTypeId]}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {moment(itemKey.lastUpdatedUTC).format("MMMM Do YYYY")}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {itemKey.score}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        <ul>
          {itemKey.questionChoices.map((choice) => (
            <Tooltip title={choice.choice}>
              <li>
                <MDTypography type="h5" fontSize={16}>
                  {choice.choice}
                </MDTypography>
              </li>
            </Tooltip>
          ))}
        </ul>
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
      <TableCell>
        <Grid item container justifyContent="space-between">
          <Grid item>
            <MDTypography
              type="h5"
              fontSize={16}
              className={classes.pointer}
              onClick={() => setOpen(!open)}
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <KeyboardArrowUpIcon fontSize="medium" />
                ) : (
                  <KeyboardArrowDownIcon fontSize="medium" />
                )}
              </IconButton>
              {item.name}
            </MDTypography>
          </Grid>
          <Grid item justifyContent="flex-end">
            <Grid item>
              <EditGroup
                questionnaireGroupTemplateQuestionId={item.id}
                name={item.name}
              />
              <AddTemplateQuestion
                questionnaireGroupTemplateQuestionId={Number(item.id)}
              />
              <AddGroupScore groupTemplateId={Number(item.id)} />
              <GroupScoreList groupTemplateId={Number(item.id)} />
            </Grid>
          </Grid>
        </Grid>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table
              renderDataTable={renderDataTable}
              tableHead={COLUMNS_ITEM.map((q) =>
                t(translationKeys.question[q])
              )}
              tableData={item?.questions || []}
              emptyTable={t(translationKeys.question.available)}
              customCellClasses={[classes.center, classes.right, classes.right]}
              customClassesForCells={[0, 4, 5]}
              customHeadCellClasses={[
                classes.center,
                classes.right,
                classes.right,
              ]}
              customHeadClassesForCells={[0, 4, 5]}
            />
          </Box>
        </Collapse>
      </TableCell>
    </>
  );
}

export default QuestionItem;
