// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Material Dashboard 2 React components
import MDBox from "components/core-components/MDBox";
import MDTypography from "components/core-components/MDTypography";
import Grid from "@mui/material/Grid";

import { IconButton } from "@mui/material";

function ComplexStatisticsCard({
  color,
  title,
  count,
  percentage,
  icon,
  mr,
  onClickTitle,
  onClickEdit,
  ml,
  onClickDelete,
  isCenter,
  ...rest
}) {
  return (
    <Card>
      <span {...rest}>
        {icon ? (
          <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
            <MDBox
              position="absolute"
              variant="gradient"
              bgColor={color}
              color={color === "light" ? "dark" : "white"}
              coloredShadow={color}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="4rem"
              height="4rem"
              mt={-3}
            >
              {icon}
            </MDBox>
          </MDBox>
        ) : null}
        <MDBox textAlign="right" lineHeight={1.25} mr={mr}>
          <MDTypography
            variant="button"
            fontWeight="light"
            color="text"
            onClick={() => onClickTitle && onClickTitle()}
          >
            {title}
          </MDTypography>
          {count ? (
            <MDTypography variant="h4" textAlign={isCenter ? "center" : ""}>
              {count}
            </MDTypography>
          ) : null}
        </MDBox>
      </span>
      {percentage ? (
        <>
          <Divider />

          <MDBox pb={2} px={2}>
            <Grid container xs={12} justifyContent="space-between">
              <Grid item>
                <MDTypography
                  component="p"
                  variant="button"
                  color="text"
                  display="flex"
                >
                  <MDTypography
                    component="span"
                    variant="button"
                    fontWeight="bold"
                    color={percentage.color}
                  >
                    {percentage.amount}
                  </MDTypography>
                  &nbsp;{percentage.label}
                </MDTypography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={(e) => {
                    onClickEdit && onClickEdit();
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    onClickDelete && onClickDelete();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </MDBox>
        </>
      ) : null}
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
