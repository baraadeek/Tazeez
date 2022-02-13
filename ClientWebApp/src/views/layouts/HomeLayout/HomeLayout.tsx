import * as React from "react";
import Footer from "views/examples/page/Footer";
import AuthNavbar from "components/common-components/Navbars/AuthNavbar";
import { IRoute } from "routes/routes";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useIsRtl } from "common/hooks/appHooks";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import { IRootReducer } from "store/reducers/rootReducer";
import { useSelector } from "react-redux";
import createCache from "@emotion/cache";
import { AppDirectionEnum } from "common/constants/directionEnum";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { Grid } from "@material-ui/core";

interface IHomeLayoutProps {
  routes?: IRoute[];
}

const HomeLayout: React.FunctionComponent<IHomeLayoutProps> = (props) => {
  const [rtlCache, setRtlCache] = React.useState<EmotionCache>();
  const isRtl = useIsRtl();
  const { t } = useTranslation(namespaces.routes.authRoutes);
  const isAdminUser = useSelector<IRootReducer, boolean>(
    (state) => !!state.auth.user?.isAdmin
  );

  // Cache for the rtl
  React.useMemo(() => {
    const cacheRtl = createCache({
      key: AppDirectionEnum.rtl,
      //@ts-ignore
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const Parent = isRtl ? CacheProvider : React.Fragment;
  const parentProps = isRtl ? { value: rtlCache } : {};

  return (
    //@ts-ignore
    <Parent {...parentProps}>
      <ThemeProvider theme={isRtl ? themeRTL : theme}>
        <AuthNavbar routes={props.routes} />
        <Grid container item direction="column"  style={{ height: "100%" }}>
          {props.children}
        </Grid>
        <Footer />
      </ThemeProvider>
    </Parent>
  );
};

export default HomeLayout;
