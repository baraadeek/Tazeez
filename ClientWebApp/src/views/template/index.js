import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import React from "react";
import TemplateList from "./components/template-list";
import PageBanner from "views/examples/Common/PageBanner";
import { namespaces } from "i18n/i18n.constants";
import { useTranslation } from "react-i18next";
import translationKeys from "i18n/locales/translationKeys";

function Templates() {
  const { t } = useTranslation([
    namespaces.pages.login,
    namespaces.routes.authRoutes,
  ]);

  return (
    <React.Fragment>
      <PageBanner
        pageTitle={t(translationKeys.authRoutes.questionsTemplatesList, {
          ns: namespaces.routes.authRoutes,
        })}
        homePageUrl={ROUTES_PATH_ENUM.Home}
        homePageText={t(translationKeys.common.homePage)}
        activePageText={t(translationKeys.authRoutes.questionsTemplatesList, {
          ns: namespaces.routes.authRoutes,
        })}
        bgImage="page-title-one"
      />
      <div style={{ minHeight: 700, paddingRight:16, paddingLeft:16, paddingTop:16 }}>
        <TemplateList />
      </div>
    </React.Fragment>
  );
}

export default Templates;
