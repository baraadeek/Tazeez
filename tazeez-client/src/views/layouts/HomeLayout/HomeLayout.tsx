import * as React from "react";
import Footer from "views/examples/page/Footer";
import AuthNavbar from "components/common-components/Navbars/AuthNavbar";

interface IHomeLayoutProps {}

const HomeLayout: React.FunctionComponent<IHomeLayoutProps> = (props) => {
  return (
    <>
      <AuthNavbar />
      {props.children}
      <Footer />
    </>
  );
};

export default HomeLayout;
