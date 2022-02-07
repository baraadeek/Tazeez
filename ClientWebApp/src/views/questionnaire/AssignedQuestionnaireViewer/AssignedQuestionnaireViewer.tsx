import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { axiosAPI } from "axiosAPI";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import IFilterable from "common/sharedInterfaces/IFilterable";
import IPagination from "common/sharedInterfaces/IPagination";
import ISortable from "common/sharedInterfaces/ISortable";
import DataGridTable from "components/core-components/DataGridTable/DataGridTable";
import { END_POINTS } from "endpoint";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import * as React from "react";
import { useTranslation } from "react-i18next";
import PageBanner from "views/examples/Common/PageBanner";

interface IAssignedQuestionnaireViewerProps {}

export type IQuestionnaire = {
  id: number;
  questionnaireGroupId: number;
  status: number;
  statusOrder: number;
  userId: number;
  questionnaireTemplateId: number;
  questionnaireTemplateName: string;
  questionnaireName: string;
  numberOfQuestions: number;
  numberOfAnsweredQuestions: number;
  dueDateUTC: Date;
  completedUtc: Date | null;
  createdUTC: Date;
};

export type IGetQuestionnaireRes = {
  filterable: IFilterable;
  sortable: ISortable;
  pagination: IPagination;
  data: IQuestionnaire[];
};
const AssignedQuestionnaireViewer: React.FunctionComponent<
  IAssignedQuestionnaireViewerProps
> = (props) => {
  const { t } = useTranslation([
    namespaces.pages.login,
    namespaces.routes.authRoutes,
  ]);

  const [isLoadingQuestionnaire, setIsLoadingQuestionnaire] =
    React.useState(false);
  const [questionnaireRes, setQuestionnaireRes] =
    React.useState<IGetQuestionnaireRes | null>(null);

  function renderPagePanner() {
    return (
      <PageBanner
        pageTitle={t(translationKeys.authRoutes.assignedQuestionnaires, {
          ns: namespaces.routes.authRoutes,
        })}
        homePageUrl={ROUTES_PATH_ENUM.Home}
        homePageText={t(translationKeys.common.homePage)}
        activePageText={t(translationKeys.authRoutes.assignedQuestionnaires, {
          ns: namespaces.routes.authRoutes,
        })}
        bgImage="page-title-one"
      />
    );
  }

  const getTemplatesAndUsers = async () => {
    setIsLoadingQuestionnaire(true);
    try {
      const { data } = await axiosAPI.get<IGetQuestionnaireRes>(
        END_POINTS.getQuestionnaire.url
      );
      setQuestionnaireRes(data);
    } catch (error) {}

    setIsLoadingQuestionnaire(false);
  };

  React.useEffect(() => {
    getTemplatesAndUsers();
  }, []);

  function renderAssignedQuestionnaireViewer() {
    const columns: GridColDef[] = [
      {
        field: "questionnaireTemplateName",
        headerName: t(
          translationKeys.pages.assignedQuestionnaire.questionnaireTemplateName
        ),
        width: 200,
      },
      {
        field: "questionnaireName",
        headerName: t(
          translationKeys.pages.assignedQuestionnaire.questionnaireName
        ),
        width: 200,
      },
      {
        field: "numberOfQuestions",
        headerName: t(
          translationKeys.pages.assignedQuestionnaire.numberOfQuestions
        ),
        width: 200,
      },
      {
        field: "numberOfAnsweredQuestions",
        headerName: t(
          translationKeys.pages.assignedQuestionnaire.numberOfAnsweredQuestions
        ),
        width: 200,
      },
      {
        field: "dueDateUTC",
        headerName: t(translationKeys.pages.assignedQuestionnaire.dueDateUTC),
        width: 200,
      },
      {
        field: "completedUtc",
        headerName: t(translationKeys.pages.assignedQuestionnaire.completedUtc),
        width: 200,
        renderCell: (params) => (
          <div style={{width:'100%'}}>
            <p style={{ textAlign: "center" }}>
              {params.row.completedUtc || "-"}
            </p>
          </div>
        ),
      },
      {
        field: "createdUTC",
        headerName: t(translationKeys.pages.assignedQuestionnaire.createdUTC),
        width: 150,
      },
      {
        field: "status",
        headerName: t(translationKeys.pages.assignedQuestionnaire.status),
        width: 150,
      },
    ];

    return (
      <>
        <Grid container style={{ minHeight: 700 }} paddingX={2} paddingY={2}>
          <Grid item md={12} xs={12} sm={12}>
            <DataGridTable
              search
              loading={isLoadingQuestionnaire}
              // searchProps={{
              //   onSearchClick: onSearchUser,
              //   clearSearch: onSearchUser,
              //   label: "Search ...",
              // }}
              rows={
                questionnaireRes?.data.map((q) => ({
                  id: q.id,
                  questionnaireName: q.questionnaireName,
                  questionnaireTemplateName: q.questionnaireTemplateName,
                  numberOfQuestions: q.numberOfQuestions,
                  numberOfAnsweredQuestions: q.numberOfAnsweredQuestions,
                  dueDateUTC: q.dueDateUTC,
                  createdUTC: q.createdUTC,
                  status: q.status,
                  completedUtc: q.completedUtc,
                })) || []
              }
              columns={columns}
              pageSize={questionnaireRes?.pagination.pageSize}
            />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <React.Fragment>
      {renderPagePanner()}
      {renderAssignedQuestionnaireViewer()}
    </React.Fragment>
  );
};

export default AssignedQuestionnaireViewer;
