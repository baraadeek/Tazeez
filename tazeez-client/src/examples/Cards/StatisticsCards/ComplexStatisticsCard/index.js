/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/core-components/MDBox";
import MDTypography from "components/core-components/MDTypography";

function ComplexStatisticsCard({
  color,
  title,
  count,
  percentage,
  icon,
  mr,
  isCenter,
  ...rest
}) {
  return (
    <Card {...rest}>
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
        <MDTypography variant="button" fontWeight="light" color="text">
          {title}
        </MDTypography>
        {count ? (
          <MDTypography variant="h4" textAlign={isCenter ? "center" : ""}>
            {count}
          </MDTypography>
        ) : null}
      </MDBox>
      {percentage ? (
        <>
          <Divider />

          <MDBox pb={2} px={2}>
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
