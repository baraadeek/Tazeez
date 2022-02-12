import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "thunk-dispatch";
import moment from "moment";

// Material UI
import { Grid, CircularProgress, makeStyles, Box } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import GroupIcon from "@material-ui/icons/Group";

// Components
import Table from "components/core-components/Table/table";

// Constants
import { childrenSelectors } from "../selectors/children-selectors";
import childrenListViewStyle from "./children-list-view-style";
import { COLUMNS } from "../enums";
import MDAvatar from "components/core-components/MDAvatar";
import MDTypography from "components/core-components/MDTypography";

import CardHeader from "components/core-components/card/CardHeader";
import CardIcon from "components/core-components/card/CardIcon";
import CardBody from "components/core-components/card/CardBody";
import CardComponent from "components/core-components/card/CardComponent";
import { purge } from "../slice/children-slice";

import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import AddChildren from "./add-children";
import DeleteChildren from "./delete-children";
import EditChildren from "./edit-children";
import { getChildrenListThunk } from "../api/children-thunk-api";

const useStyle = makeStyles(childrenListViewStyle);

function ChildrenList() {
  //#region hooks
  const classes = useStyle();

  const dispatch = useDispatch();
  //#endregion

  const childrenList = useSelector(childrenSelectors);

  const { t } = useTranslation(namespaces.children);

  //#region Life Cycle

  const getChildrenList = useCallback(dispatchGetChildrenListFunc, []);

  useEffect(
    (_) => {
      getChildrenList();
    },
    [getChildrenList]
  );

  useEffect((_) => {
    return () => {
      dispatch(purge());
    };
  }, []);

  async function dispatchGetChildrenListFunc() {
    ThunkDispatch(getChildrenListThunk())
      .then((result) => {})
      .catch((error) => console.error("getChildrenListThunk", error))
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
        <Box display={"flex"} alignItems={"center"}>
          <MDAvatar src={item?.image} alt={item?.fullName} size="sm" />
          <Box display={"flex"} marginLeft={1} overflow={"hidden"}>
            <MDTypography overFlow type={"h4"} fontcolor={"gray"}>
              {item?.fullName}
            </MDTypography>
          </Box>
        </Box>
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {moment(item.birthDay).format("MMMM Do YYYY")}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.gender
          ? t(translationKeys.children.male)
          : t(translationKeys.children.female)}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        <Grid container justify="flex-end" direction="row" alignItems="center">
          <EditChildren id={item.id} />
          <DeleteChildren id={item.id} />
        </Grid>
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
              {t(translationKeys.children.children)}
            </h4>
          </CardHeader>
          <CardBody>
            <AddChildren />
            {!false ? (
              <Table
                renderDataTable={renderDataTable}
                tableHead={COLUMNS.map((d) => t(translationKeys.children[d]))}
                tableData={childrenList}
                emptyTable={t(translationKeys.children.available)}
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

export default ChildrenList;
