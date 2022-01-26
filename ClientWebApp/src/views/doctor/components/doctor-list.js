import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "thunk-dispatch";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

// Material UI
import { Grid, CircularProgress, makeStyles, Box } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import GroupIcon from "@material-ui/icons/Group";

// Components
import Table from "components/core-components/Table/table";

// Constants
import { getDoctorListThunk } from "../api/doctor-thunk-api";
import { doctorSelectors } from "../selectors/doctor-selectors";
import questionListViewStyle from "./question-list-view-style";
import { COLUMNS, QUESTION_TYPE_ID } from "../enums";
import MDAvatar from "components/core-components/MDAvatar";
import MDTypography from "components/core-components/MDTypography";

import CardHeader from "components/core-components/card/CardHeader";
import CardIcon from "components/core-components/card/CardIcon";
import CardBody from "components/core-components/card/CardBody";
import CardComponent from "components/core-components/card/CardComponent";
import { purge } from "../slice/doctor-slice";
import DeleteDoctor from "./delete-doctor";
import EditDoctor from "./edit-doctor";
import AddDoctor from "./add-doctor";
import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";

const useStyle = makeStyles(questionListViewStyle);

function DoctorList() {
  //#region hooks
  const classes = useStyle();
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  //#endregion

  const doctorList = useSelector(doctorSelectors);
  const { t } = useTranslation(namespaces.doctor);

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
    ThunkDispatch(getDoctorListThunk())
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
        <Box display={"flex"} alignItems={"center"}>
          <MDAvatar
            src={item?.user?.image}
            alt={item?.user?.fullName}
            size="sm"
          />
          <Box display={"flex"} marginLeft={1} overflow={"hidden"}>
            <MDTypography overFlow type={"h4"} fontcolor={"gray"}>
              {item?.user?.fullName}
            </MDTypography>
          </Box>
        </Box>
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.user?.email}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.phoneNumber}
      </TableCell>
    );

    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.city}
      </TableCell>
    );
    rowColumn.push(
      <TableCell className={tableCellClasses} key={key}>
        {item?.specialist}
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
        <Grid container justify="flex-end" direction="row" alignItems="center">
          <EditDoctor id={item.id} />
          <DeleteDoctor id={item.id} />
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
              {t(translationKeys.doctor.doctors)}
            </h4>
          </CardHeader>
          <CardBody>
            <AddDoctor />
            {!false ? (
              <Table
                renderDataTable={renderDataTable}
                tableHead={COLUMNS.map((d) => t(translationKeys.doctor[d]))}
                tableData={doctorList}
                emptyTable={t(translationKeys.doctor.available)}
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

export default DoctorList;
