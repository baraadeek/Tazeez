import * as React from "react";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";

// Material Dashboard 2 React themes
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSelector } from "react-redux";
import { IRootReducer } from "store/reducers/rootReducer";
import { useIsRtl } from "common/hooks/appHooks";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import { EmotionCache } from "@emotion/react";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { AppDirectionEnum } from "common/constants/directionEnum";
import translationKeys from "i18n/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import { getKeyValue } from "common/utils/utils";
import { IRoute } from "routes/routes";

interface IAdminLayoutProps {
  routes: IRoute[];
}

const AdminLayout: React.FunctionComponent<IAdminLayoutProps> = (props) => {
  const { routes } = props;
  const sidenavColor = useSelector<IRootReducer, string>(
    (state) => state.app.sidenavColor
  );
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
        <CssBaseline />
        <DashboardLayout>
          <DashboardNavbar />
          {props.children}
          <CssBaseline />
          <Sidenav
            color={sidenavColor}
            routes={routes
              .filter(
                (x) =>
                  (!x.isHidden && !x.requireAdmin) ||
                  (x.requireAdmin && isAdminUser)
              )
              .map((r) => ({
                type: "collapse",
                name: t(
                  getKeyValue(
                    translationKeys.authRoutes,
                    r.translationKey as any
                  )
                ),
                key: r.path.replace("/", "").toLowerCase(),
                icon: null,
                route: r.path,
              }))}
          />
        </DashboardLayout>
      </ThemeProvider>
    </Parent>
  );
};

export default AdminLayout;
