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
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./style.css";
import { createStyles, Divider, makeStyles, Theme } from "@material-ui/core";
import MDButton from "components/core-components/MDButton";

const useICTableStyle = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: "white",
    },
  })
);
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

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "image",
    headerName: "Image",
    width: 110,
    renderCell: (params) => {
      return (
        <Avatar alt="Remy Sharp" src={params.value}>
          {params.row.firstName[0] + params.row.lastName[0]}
        </Avatar>
      );
    },
  },
];

export default function CreateQuestionnairePage(
  props: ICreateQuestionnairePageProps
) {
  const { t } = useTranslation(namespaces.pages.createQuestionnaire);
  const classes = useICTableStyle();
  const questionnaireTitle = t(
    translationKeys.pages.createQuestionnaire.questionnaireTitle
  );

  const [dueDate, setDueDate] = React.useState<Date | null>(new Date());
  const [title, setTitle] = React.useState<string>("");
  const [templateList, setTemplateList] = React.useState<IGetTemplateListRes>(
    []
  );
  const [usersList, setUsersList] = React.useState<IGetUsersListRes | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddingQuestionnaire, setIsAddingQuestionnaire] =
    React.useState(false);
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
      },
    },
  }));

  const getTemplateList = async () => {
    setIsLoading(true);
    try {
      const { data: tempList } = await axiosAPI.get<IGetTemplateListRes>(
        END_POINTS.getTemplateList.url
      );

      const { data: usersList } = await axiosAPI.get(END_POINTS.getUsers.url);
      setTemplateList(tempList);
      setUsersList(usersList);
    } catch (error) {}

    setIsLoading(false);
  };

  React.useEffect(() => {
    getTemplateList();
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
    } catch (error) {}
    setSelectedTemplate(0);
    setSelectedUsers([]);
    setTitle("");
    setIsAddingQuestionnaire(false);
  };

  return (
    <Grid container marginTop={10} spacing={1}>
      <Grid container item md={12} xs={12} lg={12} spacing={1}>
        <Grid item md={6} sm={12} lg={6}>
          <MDInputRoot
            style={{ width: "100%" }}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            title={questionnaireTitle}
            placeholder={questionnaireTitle}
            type="text"
            label={questionnaireTitle}
          />
        </Grid>
        <Grid item md={6} sm={12} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
            minDate={new Date()}
              label="Due Date"
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
          <Divider />
          <p>Template List</p>
          <ICTable
            isLoading={isLoading}
            select
            hover
            paperProps={{
              variant: "outlined",
            }}
            headers={["template name", "added date", "number of questions"]}
            rows={templateListRows}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <div style={{ height: 400, width: "100%" }}>
            <Divider />
            <p>Users</p>
            <DataGrid
              loading={isLoading}
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
              classes={{
                root: classes.paper,
              }}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={(selectedArr) => {
                setSelectedUsers(selectedArr as number[]);
              }}
            />
          </div>
        </Grid>
        <Grid item md={12} xs={12} marginTop={16}>
          <MDButton
            onClick={onMakeQuestionnaire}
            startIcon={
              <Grow mountOnEnter unmountOnExit in={isAddingQuestionnaire}>
                <CircularProgress style={{ color: "white" }} size={15} />
              </Grow>
            }
            disabled={
              isAddingQuestionnaire ||
              !(
                title.trim().length &&
                selectedTemplate !== 0 &&
                selectedUsers.length
              )
            }
            variant="contained"
            color="info"
          >
            Add Questionnaire
          </MDButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
