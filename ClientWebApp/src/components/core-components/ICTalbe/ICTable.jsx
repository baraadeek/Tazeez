import { useState } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Collapse, Typography } from "@material-ui/core";
import { Grid, IconButton, TextField } from "@mui/material";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import useICTableStyle from "./icTableStyle";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CardComponent from "../card/CardComponent";
import CardBody from "../card/CardBody";
import CardIcon from "../card/CardIcon";
import CardHeader from "../card/CardHeader";
import classNames from "classnames";
export default function ICTable(props) {
  const classes = useICTableStyle(props);
  const {
    headers,
    rows,
    isLoading,
    disabled,
    tableContainerProps,
    paperProps,
    emptyView,
    hover,
    addCollapse,
    page,
    rowsPerPage,
    rowsPerPageOptions,
    onChangePage,
    onChangeRowsPerPage,
    addPagination,
    totalItems,
    paperEffect,
    searchInputProps,
    select,
    search,
  } = props;

  const [collapseRow, setCollapseRow] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [searchTextValue, setSearchTextValue] = useState(
    searchInputProps.defaultValue
  );
  function selectedRowClassName(index) {
    let className = "";

    if (selectedRowIndex === index) {
      className = classes.selectedRow;
    }

    return className;
  }

  function onRowClick(row, index, callback) {
    return function (event) {
      setSelectedRowIndex(index);
      callback(event, row);
    };
  }

  const tableHeaders = headers.map((header, index) => (
    <TableCell key={index}>
      <Typography variant="subtitle2" color="textSecondary">
        {header}
      </Typography>
    </TableCell>
  ));

  const onCollapseRowClick = (i) => (event) => {
    if (collapseRow === i) {
      setCollapseRow(null);
    } else {
      setCollapseRow(i);
    }
  };

  let tableRows = [];
  if (addCollapse) {
    tableRows =
      rows &&
      rows.length &&
      rows.map((row, index) => [
        <TableRow
          {...row.props}
          hover
          key={index}
          className={classes.cursorPointer}
          onClick={onCollapseRowClick(index)}
        >
          {row.cells.map((cell, i) => (
            <TableCell key={i} {...cell.props}>
              {cell.component}
            </TableCell>
          ))}
        </TableRow>,
        <TableRow
          hover
          key={index + 1}
          {...(row.collapseRow && row.collapseRow.props)}
        >
          <TableCell
            className={classes.collapseTableCell}
            colSpan={headers.length}
          >
            <Collapse in={collapseRow === index} timeout="auto" unmountOnExit>
              {(row.collapseRow && row.collapseRow.component) || " "}
            </Collapse>
          </TableCell>
        </TableRow>,
      ]);
  } else {
    tableRows =
      (rows &&
        rows.length &&
        rows.map((row, rowI) => (
          <TableRow
            {...row.props}
            hover={hover}
            key={row.id || rowI}
            onClick={
              select
                ? onRowClick(row, rowI, row?.props?.onClick)
                : row?.props?.onClick
            }
            className={classNames(
              row?.props?.className || "",
              selectedRowClassName(rowI),
              { [classes.cursorPointer]: props.hover }
            )}
          >
            {row.cells.map((cell, index) => (
              <TableCell key={index} {...cell.props}>
                {cell.component}
              </TableCell>
            ))}
          </TableRow>
        ))) ||
      [];
  }

  function renderSearchBar() {
    if (!search) return null;

    const { onSearchClick, value, onChange, clearSearch, controlled, ...rest } =
      searchInputProps;

    const searchText = controlled ? value : searchTextValue;
    return (
      <Grid container item padding={1} justifyContent={"flex-start"}>
        <TextField
          variant="standard"
          {...rest}
          value={searchText}
          onChange={
            controlled
              ? onChange
              : function (event) {
                  setSearchTextValue(event.target.value);
                }
          }
          InputProps={{
            startAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                onClick={function () {
                  onSearchClick?.(searchText);
                }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: searchText ? "visible" : "hidden" }}
                onClick={function () {
                  if (!controlled) {
                    setSearchTextValue("");
                  }
                  clearSearch?.("");
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </Grid>
    );
  }

  const renderLoaderOrEmptyView = () => (
    <>
      {renderSearchBar()}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.loader}
        {...paperProps}
      >
        <Grid item>
          {isLoading ? (
            <CircularProgress />
          ) : emptyView ? (
            emptyView
          ) : (
            <strong>No Data!</strong>
          )}
        </Grid>
      </Grid>
    </>
  );

  const tableContainerClassName = `${disabled ? classes.disabled : ""} ${
    (!paperEffect && classes.removePaperEffect) || ""
  }`;

  return (
    <CardComponent>
      <CardHeader color="primary" icon>
        <CardIcon color="primary">{props.headerIcon}</CardIcon>
        <h4 className={classes.cardBodyHeaderTitle}>{props.headerTitle}</h4>
      </CardHeader>
      <CardBody className={classNames(classes.cardBody)}>
        {isLoading || (tableRows && !tableRows.length) || !tableRows ? (
          renderLoaderOrEmptyView()
        ) : (
          <>
            {renderSearchBar()}
            <TableContainer
              {...tableContainerProps}
              component={"div"}
              className={tableContainerClassName}
            >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>{tableHeaders}</TableRow>
                </TableHead>
                <TableBody>{tableRows}</TableBody>
              </Table>
            </TableContainer>
            {addPagination && (
              <TablePagination
                component="div"
                rowsPerPageOptions={rowsPerPageOptions}
                count={totalItems || rows.length}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            )}
          </>
        )}
      </CardBody>
    </CardComponent>
  );
}

ICTable.propTypes = {
  headers: PropTypes.array,
  rows: PropTypes.array,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
  tableContainerProps: PropTypes.object,
  paperProps: PropTypes.object,
  emptyView: PropTypes.any,
  addPagination: PropTypes.bool,
  select: PropTypes.bool,
  paperEffect: PropTypes.bool,
  search: PropTypes.bool,
  rowsPerPageOptions: PropTypes.array,
  searchInputProps: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
  headerIcon: PropTypes.any,
  headerTitle: PropTypes.string,
  onChangeRowsPerPage: PropTypes.func,
};

ICTable.defaultProps = {
  rowsPerPageOptions: [5, 15, 20],
  rowsPerPage: 5,
  page: 1,
  paperEffect: true,
  headers: ["Header#1", "Header#2"],
  rows: [
    {
      id: 1,
      cells: [
        { component: "Row#1Cell1", props: {} },
        { component: "Row#1Cell2", props: {} },
      ],
      props: {},
      collapseRow: { component: "collapseRow#1", props: {} },
    },
    {
      id: 2,
      cells: [
        { component: "Row#2Cell1", props: {} },
        { component: "Row#2Cell2", props: {} },
      ],
      props: {},
      collapseRow: { component: "collapseRow#2", props: {} },
    },
  ],
};
