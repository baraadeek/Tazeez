import * as React from "react";
import { Wizard, useWizard } from "react-use-wizard";
import {
  Avatar,
  CardHeader,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getQuestionnaireQuestionsAction,
  IGetQuestionnaireQuestionsRes,
} from "store/actions/questions/questionsActionCretors";
import { useParams } from "react-router-dom";
import { IQuestion, IUser } from "common/sharedInterfaces/modelsInterfaces";
import CardComponent from "components/core-components/card/CardComponent";
import CardBody from "components/core-components/card/CardBody";
import { useFlexDirection, useMountedState } from "common/hooks/appHooks";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import useAssignedQuestionnaireStyles from "./assignedQuestionnaireStyles";
import classNames from "classnames";
import { getUserFullName } from "common/utils/utils";
const {
  pages: { assignedQuestionnaires },
} = translationKeys;
interface IAssignedQuestionnaireProps {}

const AssignedQuestionnaire: React.FunctionComponent<
  IAssignedQuestionnaireProps
> = (props) => {
  const [getQuestionsRes, setGetQuestionsRes] =
    useMountedState<IGetQuestionnaireQuestionsRes | null>(null);
  const [isLoading, setIsLoading] = useMountedState(false);
  const params = useParams<{ id: string }>();
  const { t } = useTranslation(namespaces.pages.assignedQuestionnaire);
  const classes = useAssignedQuestionnaireStyles();

  function renderAdditionalAnswer() {
    return (
      <Grid container item flexGrow={1}>
        <Grid item md={6} container paddingRight={2}>
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            label={t(
              translationKeys.pages.assignedQuestionnaires.commentAnswer
            )}
          />
        </Grid>
        <Grid item md={6} paddingX={2} className={classes.attachmentBox}>
          attachments
        </Grid>
      </Grid>
    );
  }

  const getQuestionnaireQuestions = React.useCallback(
    async function () {
      setIsLoading(true);
      try {
        const { data } = await getQuestionnaireQuestionsAction({
          questionnaireId: Number(params.id) + 1,
        });

        setGetQuestionsRes(data);
      } catch (error) {}
      setIsLoading(false);
    },
    [params.id, setGetQuestionsRes, setIsLoading]
  );

  React.useEffect(() => {
    getQuestionnaireQuestions();
  }, [getQuestionnaireQuestions]);

  function renderLoader() {
    return (
      <>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </>
    );
  }

  function renderSteps({ questions }: { questions: IQuestion[] | undefined }) {
    if (!questions) return null;

    return questions.map((q) => (
      <CardComponent
        className={classNames(
          classes.cardComponent,
          classes.displayFlexGrowFull
        )}
        key={q.questionId}
      >
        <CardBody
          item
          container
          flexGrow={1}
          flexDirection="column"
          gap={4}
          alignContent={"baseline"}
          component={Grid}
          className={classes.displayFlex}
        >
          <Grid item flexGrow={0}>
            <h2 className={classes.question}>
              {t(assignedQuestionnaires.question)}:{" "}
            </h2>
            <p className={classes.questionText}>{q.questionText}</p>
          </Grid>
          <Grid container item gap={2} flexGrow={0}>
            <Grid item>
              <h2 className={classes.choicesText}>
                {t(assignedQuestionnaires.choices)}:
              </h2>
            </Grid>
            <Grid item className={classes.choicesContainer}>
              <FormGroup>
                {q.answerChoices.map((c) => (
                  <FormControlLabel
                    key={c.id}
                    control={<Checkbox />}
                    label={c.choice}
                    className={classes.choiceCheckBox}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
          {renderAdditionalAnswer()}
        </CardBody>
      </CardComponent>
    ));
  }

  function renderAssignedUser() {
    if (!getQuestionsRes) return;

    const assignedUser = Object.values(
      getQuestionsRes?.assignedUsers
    )[0] as IUser;

    assignedUser.birthDay = new Date();

    const title = (
      <Grid container flexDirection={"row"}>
        <Grid item md={12}>
          <p className={classes.removeMargin}>{getUserFullName(assignedUser)}</p>
        </Grid>
        <Grid item md={12}>
          <p className={classes.removeMargin}>{assignedUser.birthDay.toLocaleDateString()}</p>
        </Grid>
      </Grid>
    );

    return (
      <Grid item>
        <CardHeader
          avatar={
            <Avatar alt={assignedUser.firstName} src={assignedUser.image} />
          }
          title={title}
        />
      </Grid>
    );
  }

  return (
    <Grid container style={{ minHeight: "80vh" }} flexDirection="column">
      {isLoading && getQuestionsRes?.questions.data.length ? (
        renderLoader()
      ) : (
        <>
          {renderAssignedUser()}
          <Wizard footer={<WizardFooter />}>
            {renderSteps({ questions: getQuestionsRes?.questions.data })}
          </Wizard>
        </>
      )}
    </Grid>
  );
};

export default AssignedQuestionnaire;

type IWizardFooterProps = {};

function WizardFooter(props: IWizardFooterProps) {
  const {
    nextStep,
    previousStep,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
  } = useWizard();
  const [flexDirection] = useFlexDirection();

  return (
    <Grid item container justifyContent={"center"}>
      <Grid
        item
        container
        justifyContent={"center"}
        flexDirection={flexDirection}
      >
        <Grid item>
          <IconButton
            disabled={isFirstStep}
            title="Back"
            aria-label="Back"
            size="small"
            color="info"
            onClick={previousStep}
          >
            <ArrowBackIosIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            disabled={isLastStep}
            title="Next"
            aria-label="Next"
            size="small"
            color="info"
            onClick={nextStep}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item>
        <p>
          Question number {activeStep + 1} of {stepCount}
        </p>
      </Grid>
    </Grid>
  );
}
