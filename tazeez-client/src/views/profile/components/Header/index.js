import React, { useCallback, useEffect, useState } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components

// Material Dashboard 2 PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";
import MDTypography from "components/core-components/MDTypography";
import MDBox from "components/core-components/MDBox";
import MDAvatar from "components/core-components/MDAvatar";
import { useSelector } from "react-redux";
import { userSelectors } from "views/profile/selectors/user-selectors";
import Profile from "../../profile.png";

// Images

function Header({ children, onChange }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [image, setImage] = React.useState("");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const user = useSelector(userSelectors)[0];
  const uploadInputRef = React.useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    if (file.size > 1024) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setImage(reader.result);
        onChange(reader.result);
      };
      reader.readAsDataURL(file);

      //uploadImageThunk;
    }
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="6.75rem"
        borderRadius="xl"
        sx={{
          background: "linear-gradient(195deg, #0046c0, #0046c0)",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <span
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                uploadInputRef.current && uploadInputRef.current.click();
              }}
            >
              <MDAvatar
                src={(image.length ? image : user?.image) || Profile}
                alt="profile-image"
                size="xl"
                shadow="sm"
              />
            </span>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {user?.fullName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {user?.doctor?.specialist}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
