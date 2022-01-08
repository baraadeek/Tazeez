import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

import TZTypography from "components/tz-typography/tz-typography";
import TZBox from "components/tz-box/tz-box";

function TZCard({ color, title, count, percentage, icon, ...other }) {
  return (
    <Card {...other}>
      <TZBox display="flex" justifyContent="space-between" pt={1} px={2}>
        {icon ? (
          <TZBox
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
            mt={-1}
          >
            {icon}
          </TZBox>
        ) : null}
        <TZBox
          textAlign={percentage?.label ? "right" : "center"}
          lineHeight={1.25}
        >
          <TZTypography variant="button" fontWeight="light" color="text">
            {title}
          </TZTypography>
          <TZTypography
            variant="h4"
            style={{
              display: "-webkit-box",
              overflow: "hidden",
              "overflow-wrap": "anywhere",
              "text-overflow": "ellipsis",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": "1 !important",
              width: "200px",
            }}
          >
            {count}
          </TZTypography>
        </TZBox>
      </TZBox>
      {percentage?.label ? (
        <>
          <Divider />
          <TZBox pb={2} px={2}>
            <TZTypography
              component="p"
              variant="button"
              color="text"
              display="flex"
            >
              <TZTypography
                component="span"
                variant="button"
                fontWeight="bold"
                color={percentage.color}
              >
                {percentage.amount}
              </TZTypography>
              &nbsp;{percentage.label}
            </TZTypography>
          </TZBox>
        </>
      ) : null}
    </Card>
  );
}

TZCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

TZCard.propTypes = {
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

export default TZCard;
