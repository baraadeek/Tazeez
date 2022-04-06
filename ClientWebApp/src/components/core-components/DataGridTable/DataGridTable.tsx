import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CardComponent from "../card/CardComponent";
import useDataGridTableStyles from "./dataGridTableStyles";
import CardBody from "../card/CardBody";
import CardHeader from "../card/CardHeader";
import CardIcon from "../card/CardIcon";
import classNames from "classnames";

type IOnChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

function QuickSearchToolbar(props: any) {
  const { value, onChange, clearSearch, onSearch, ...rest } = props;
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              onClick={onSearch}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          ),
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: value ? "visible" : "hidden" }}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
        {...rest}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export type IDataGridTableProps = DataGridProps & {
  headerIcon: React.ReactNode | any;
  headerTitle: string | any;
  search?: boolean;
  searchProps?: any & {
    onChange?: any;
    value?: any;
    controlled: boolean;
    onSearchClick?: any;
    clearSearch?: any;
  };
};

export default function DataGridTable(props: IDataGridTableProps) {
  let { search, searchProps, ...rest } = props;
  searchProps = searchProps || {};
  const [searchText, setSearchText] = React.useState("");
  const classes = useDataGridTableStyles(props);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
  };

  function makeSearch() {
    if (!search) return;
    return {
      components: { Toolbar: QuickSearchToolbar },
      componentsProps: {
        toolbar: {
          value: searchProps?.controlled ? searchProps?.value : searchText,
          onSearch: function () {
            searchProps?.onSearchClick?.(searchText);
          },
          onChange: searchProps?.controlled
            ? searchProps?.onChange
            : function (event: IOnChangeEvent) {
                requestSearch(event.target.value);
              },
          clearSearch: function () {
            if (!searchProps?.controlled) {
              requestSearch("");
            }
            searchProps?.clearSearch?.("");
          },
          ...searchProps,
        },
      },
    };
  }

  return (
    <CardComponent className={classNames(classes.fullDimensions, classes.cardComponent)}>
      <CardHeader color="primary" icon>
        <CardIcon color="primary">{props.headerIcon}</CardIcon>
        <h4 className={classes.cardBodyHeaderTitle}>{props.headerTitle}</h4>
      </CardHeader>
      <CardBody className={classNames(classes.cardBody)}>
        <DataGrid className={classNames(classes.dataGridTable)} {...rest} {...makeSearch()} />
      </CardBody>
    </CardComponent>
  );
}
