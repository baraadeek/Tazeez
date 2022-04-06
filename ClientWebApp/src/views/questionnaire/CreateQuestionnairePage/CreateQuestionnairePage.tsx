import { Avatar, CircularProgress, Grid, Grow } from "@mui/material";
import MDInputRoot from "components/core-components/MDInput/MDInputRoot";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import * as React from "react";
import { useTranslation } from "react-i18next";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ICTable from "components/core-components/ICTalbe/ICTable";
import { axiosAPI } from "axiosAPI";
import { END_POINTS } from "endpoint";
import { GridColDef } from "@mui/x-data-grid";
import "./style.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import MDButton from "components/core-components/MDButton";
import DataGridTable from "components/core-components/DataGridTable/DataGridTable";
import PageBanner from "views/examples/Common/PageBanner";
import { ROUTES_PATH_ENUM } from "common/constants/routesPathEnum";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useHistory } from "react-router-dom";

const useICTableStyle = makeStyles((theme: Theme) => createStyles({}));
export interface ICreateQuestionnairePageProps {}

export type IGetUsersListRes = {
  pagination: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
  };
  data: {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    image: string;
  }[];
};

export type IGetTemplateListRes = {
  id: number;
  name: string;
  createdDate: Date;
  numberOfQuestions: number;
}[];

export default function CreateQuestionnairePage(props: ICreateQuestionnairePageProps) {
  const { t } = useTranslation([
    namespaces.pages.createQuestionnaire,
    namespaces.routes.authRoutes,
    namespaces.common,
  ]);
  const classes = useICTableStyle();
  const questionnaireTitle = t(
    translationKeys.pages.createQuestionnaire.questionnaireTitle
  );
  const history = useHistory();
  const [dueDate, setDueDate] = React.useState<Date | null>(new Date());
  const [title, setTitle] = React.useState<string>("");
  const [templateList, setTemplateList] = React.useState<IGetTemplateListRes>([]);
  const [usersList, setUsersList] = React.useState<IGetUsersListRes | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = React.useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = React.useState(false);
  const [isAddingQuestionnaire, setIsAddingQuestionnaire] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<number>(0);

  const templateListRows = templateList.map((template) => ({
    id: template.id,
    cells: [
      {
        component: <strong>{template.name}</strong>,
      },
      {
        component: new Date(template.createdDate).toLocaleDateString(),
      },
      {
        component: <p>{template.numberOfQuestions}</p>,
      },
    ],
    props: {
      onClick: (_: any, row: any) => {
        setSelectedTemplate(row.id);
        setTitle(template.name);
      },
    },
  }));

  const getTemplatesAndUsers = async () => {
    setIsLoadingTemplates(true);
    setIsLoadingUsers(true);
    try {
      const { data: tempList } = await axiosAPI.get<IGetTemplateListRes>(
        END_POINTS.getTemplateList.url
      );

      const { data: usersList } = await axiosAPI.get(END_POINTS.getUsers.url);
      setTemplateList(tempList);
      setUsersList(usersList);
    } catch (error) {}

    setIsLoadingTemplates(false);
    setIsLoadingUsers(false);
  };

  async function onSearchTemplate(searchText: string) {
    setIsLoadingTemplates(true);
    try {
      const { data: tempList } = await axiosAPI.get<IGetTemplateListRes>(
        END_POINTS.getTemplateList.url + `?name=${searchText}`
      );

      setTemplateList(tempList);
    } catch (error) {}

    setIsLoadingTemplates(false);
  }

  async function onSearchUser(searchText: string) {
    setIsLoadingUsers(true);
    try {
      const { data: usersList } = await axiosAPI.get(
        END_POINTS.getUsers.url + `&searchText=${searchText}`
      );
      setUsersList(usersList);
    } catch (error) {}

    setIsLoadingUsers(false);
  }

  React.useEffect(() => {
    getTemplatesAndUsers();
  }, []);

  const onMakeQuestionnaire = async () => {
    setIsAddingQuestionnaire(true);
    try {
      await axiosAPI.put(END_POINTS.addQuestionnaire.url, {
        questionnaireTemplateId: selectedTemplate,
        userIds: selectedUsers,
        assessmentName: title,
        dueDate,
      });
      history.push(ROUTES_PATH_ENUM.AssignedQuestionnairesList)
    } catch (error) {}
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: t(translationKeys.pages.createQuestionnaire.fullName),
      width: 150,
    },
    {
      field: "email",
      headerName: t(translationKeys.pages.createQuestionnaire.email),
      width: 150,
    },
    {
      field: "image",
      headerName: t(translationKeys.pages.createQuestionnaire.image),
      width: 110,
      renderCell: (params) => {
        return (
          <Avatar alt={params.row.fullName} src={params.value}>
            {params.row.firstName[0] + params.row.lastName[0]}
          </Avatar>
        );
      },
    },
  ];

  function renderSubmitBtn() {
    return (
      //@ts-ignore
      <MDButton
        onClick={onMakeQuestionnaire}
        startIcon={
          <Grow mountOnEnter unmountOnExit in={isAddingQuestionnaire}>
            <CircularProgress style={{ color: "white" }} size={15} />
          </Grow>
        }
        disabled={
          isAddingQuestionnaire ||
          !(title.trim().length && selectedTemplate !== 0 && selectedUsers.length)
        }
        variant="contained"
        color="info"
      >
        {t(translationKeys.pages.createQuestionnaire.add)}
      </MDButton>
    );
  }

  return (
    <>
      <PageBanner
        pageTitle={t(translationKeys.authRoutes.createQuestionnaire, {
          ns: namespaces.routes.authRoutes,
        })}
        homePageUrl={ROUTES_PATH_ENUM.Home}
        homePageText={t(translationKeys.common.homePage, {
          ns: namespaces.common,
        })}
        activePageText={t(translationKeys.authRoutes.createQuestionnaire, {
          ns: namespaces.routes.authRoutes,
        })}
        bgImage="page-title-one"
      />
      <Grid container marginTop={10} spacing={1} paddingX={2}>
        <Grid container item md={12} xs={12} lg={12} spacing={1}>
          <Grid item md={12} sm={12} lg={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                minDate={new Date()}
                label={t(translationKeys.pages.createQuestionnaire.dueDate)}
                inputFormat="MM/dd/yyyy"
                value={dueDate}
                onChange={(date: Date | null) => {
                  setDueDate(date);
                }}
                renderInput={(params: any) => (
                  <MDInputRoot {...params} style={{ width: "100%" }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container item md={12} xs={12} lg={12} spacing={1}>
          <Grid item md={12} lg={12} xs={12}>
            <ICTable
              headerIcon={<LibraryBooksIcon />}
              headerTitle={t(translationKeys.pages.createQuestionnaire.tempList)}
              search
              isLoading={isLoadingTemplates}
              select
              hover
              searchInputProps={{
                onSearchClick: onSearchTemplate,
                clearSearch: onSearchTemplate,
                controlled: false,
                label: "Search ...",
              }}
              headers={["name", "date", "numberOfQuestions"].map((q) =>
                //@ts-ignore
                t(translationKeys.pages.createQuestionnaire[q])
              )}
              rows={templateListRows}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGridTable
                headerIcon={<PeopleOutlineIcon />}
                headerTitle={t(translationKeys.pages.createQuestionnaire.users)}
                search
                loading={isLoadingUsers}
                searchProps={{
                  onSearchClick: onSearchUser,
                  clearSearch: onSearchUser,
                  label: "Search ...",
                }}
                rows={
                  usersList?.data.map((u) => ({
                    id: u.id,
                    fullName: u.fullName,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    email: u.email,
                    image: u.image,
                  })) || []
                }
                columns={columns}
                pageSize={usersList?.data.length || 0}
                checkboxSelection
                disableSelectionOnClick
                selectionModel={selectedUsers}
                onSelectionModelChange={(selectedArr) => {
                  setSelectedUsers(selectedArr as number[]);
                }}
              />
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            {renderSubmitBtn()}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
