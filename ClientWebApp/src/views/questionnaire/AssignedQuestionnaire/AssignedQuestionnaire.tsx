import * as React from "react";
import { Wizard, useWizard } from "react-use-wizard";
import {
  Avatar,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getQuestionnaireQuestionsAction,
  IGetQuestionnaireQuestionsRes,
  saveAdditionalTextAnswerAction,
  saveMultiChoiceAnswerAction,
  saveTextAnswerAction,
} from "store/actions/questions/questionsActionCretors";
import { useParams } from "react-router-dom";
import { IChoice, IQuestion, IUser } from "common/sharedInterfaces/modelsInterfaces";
import CardComponent from "components/core-components/card/CardComponent";
import CardBody from "components/core-components/card/CardBody";
import { useFlexDirection, useMountedState } from "common/hooks/appHooks";
import { useTranslation } from "react-i18next";
import { namespaces } from "i18n/i18n.constants";
import translationKeys from "i18n/locales/translationKeys";
import useAssignedQuestionnaireStyles from "./assignedQuestionnaireStyles";
import classNames from "classnames";
import { getUserFullName } from "common/utils/utils";
import {
  SINGLE_ANSWER_QUESTION_TYPE_ID,
  MULTIPLE_ANSWER_QUESTION_TYPE_ID,
  OPEN_ENDED_QUESTION_TYPE_ID,
} from "views/question/enums";
import MultiChoice from "components/common-components/MultiChoice/MultiChoice";
import { Dictionary } from "common/sharedInterfaces/GenericInterfaces";
import FileUpload from "react-material-file-upload";
import { WizardValues } from "react-use-wizard/dist/types";

const {
  pages: { assignedQuestionnaires },
} = translationKeys;
interface IAssignedQuestionnaireProps {}

const AssignedQuestionnaire: React.FunctionComponent<IAssignedQuestionnaireProps> = (
  props
) => {
  const [getQuestionsRes, setGetQuestionsRes] =
    useMountedState<IGetQuestionnaireQuestionsRes | null>(null);
  const [isLoading, setIsLoading] = useMountedState(false);
  const [isSavingAnswer, setIsSavingAnswer] = React.useState(false);
  const [selectedChoices, setSelectedChoices] = React.useState<
    Dictionary<boolean> | undefined
  >();
  const params = useParams<{ id: string }>();
  const { t } = useTranslation(namespaces.pages.assignedQuestionnaire);
  const classes = useAssignedQuestionnaireStyles();
  const [files, setFiles] = React.useState<File[]>([]);
  const [textAnswer, setTextAnswer] = React.useState<string>("");
  const wizardValuesRef = React.useRef<WizardValues | null>();

  // const { nextStep, previousStep, isLastStep, isFirstStep, activeStep, stepCount } =
  //   wizardValuesRef?.current;
  const activeStep = wizardValuesRef?.current?.activeStep ?? 0;
  const questions = getQuestionsRes?.questions.data;
  const currentQuestion = questions?.at(activeStep);

  function renderAdditionalAnswer() {
    return (
      <Grid container item flexGrow={1}>
        <Grid item md={6} container paddingRight={2}>
          <TextField
            className={classes.textField}
            fullWidth
            multiline
            value={textAnswer}
            onChange={(event) => setTextAnswer(event.target.value)}
            label={t(translationKeys.pages.assignedQuestionnaires.commentAnswer)}
          />
        </Grid>
        <Grid item md={6} className={classes.attachmentBox}>
          <FileUpload
            sx={{
              height: "100%",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            value={files}
            title={"Attachments"}
            onChange={setFiles}
          />
        </Grid>
      </Grid>
    );
  }
  const getQuestionnaireQuestions = React.useCallback(
    async function () {
      setIsLoading(true);
      try {
        const { data } = await getQuestionnaireQuestionsAction({
          questionnaireId: Number(params.id),
        });

        setGetQuestionsRes(data);
      } catch (error) {}
      setIsLoading(false);
    },
    [params.id, setGetQuestionsRes, setIsLoading]
  );

  const saveChoiceAnswer = React.useCallback(
    async function () {
      const selectedChoicesKeys = Object.keys(selectedChoices!);
      const answerChoicesIds = selectedChoicesKeys?.length
        ? selectedChoicesKeys
            .filter((key) => selectedChoices![key])
            .map((id) => Number(id))
        : [];

      setIsSavingAnswer(true);
      try {
        const { data } = await saveMultiChoiceAnswerAction({
          questionnaireId: Number(params.id),
          assessmentQuestionAnswerChoiceIds: answerChoicesIds,
          questionId: currentQuestion!.questionId,
        });
      } catch (error) {}
      setIsSavingAnswer(false);
    },
    [selectedChoices, params.id, currentQuestion]
  );

  const saveTextAnswer = React.useCallback(
    async function (isOpenEnded = false) {
      const currentQuestion = questions?.at(activeStep);

      if (textAnswer?.trim().length) return;

      setIsSavingAnswer(true);
      try {
        const action = isOpenEnded
          ? saveTextAnswerAction
          : saveAdditionalTextAnswerAction;

        const { data } = await action({
          questionnaireId: Number(params.id),
          textAnswer,
          questionId: currentQuestion!.questionId,
        });
      } catch (error) {}
      setIsSavingAnswer(false);
    },
    [questions, activeStep, params.id, textAnswer]
  );

  const saveAnswer = React.useCallback(
    async function () {
      if (!currentQuestion || isSavingAnswer) return;

      setIsSavingAnswer(true);

      try {
        const isOpenEnded =
          currentQuestion?.questionType.toString() ===
          OPEN_ENDED_QUESTION_TYPE_ID.toString();

        if (isOpenEnded) {
          await saveTextAnswer(isOpenEnded);
        } else {
          await saveTextAnswer();
          await saveChoiceAnswer();
        }
      } catch (err) {}
      setIsSavingAnswer(false);
    },
    [currentQuestion, isSavingAnswer, saveChoiceAnswer, saveTextAnswer]
  );

  async function onNextStep() {
    await saveAnswer();

    wizardValuesRef?.current?.nextStep?.();
  }

  async function onPrevStep() {
    await saveAnswer();

    wizardValuesRef?.current?.previousStep?.();
  }

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

  function onMultiChoiceSelected(checked: boolean, choiceId: string) {
    setSelectedChoices((prev) => ({ ...prev, [choiceId]: checked }));
  }

  function onSingleChoiceSelected(checked: boolean, choiceId: string) {
    setSelectedChoices((prev) => ({ [choiceId]: checked }));
  }

  function renderAnswerView(questionType: number, choices: IChoice[]) {
    let view = null;
    switch (questionType) {
      case SINGLE_ANSWER_QUESTION_TYPE_ID:
        view = (
          <MultiChoice
            singleAnswer={true}
            selectedChoices={selectedChoices}
            choices={choices}
            onChange={onSingleChoiceSelected}
          />
        );
        break;
      case MULTIPLE_ANSWER_QUESTION_TYPE_ID:
        view = (
          <MultiChoice
            singleAnswer={false}
            selectedChoices={selectedChoices}
            choices={choices}
            onChange={onMultiChoiceSelected}
          />
        );
        break;
      case OPEN_ENDED_QUESTION_TYPE_ID:
        view = null;
        break;

      default:
        break;
    }

    return view;
  }

  function renderEmptyView() {
    return (
      <Grid container justifyContent={"center"}>
        <Grid item>No Data!</Grid>
      </Grid>
    );
  }
  function renderSteps({ questions }: { questions: IQuestion[] | undefined }) {
    if (!questions?.length) return renderEmptyView();

    return questions.map((q) => (
      <CardComponent
        className={classNames(classes.cardComponent, classes.displayFlexGrowFull)}
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
            <h2 className={classes.question}>{t(assignedQuestionnaires.question)}: </h2>
            <p className={classes.questionText}>{q.questionText}</p>
          </Grid>
          <Grid container item gap={2} flexGrow={0}>
            <Grid item>
              <h2 className={classes.choicesText}>
                {t(assignedQuestionnaires.choices)}:
              </h2>
            </Grid>
            <Grid item className={classes.choicesContainer}>
              {renderAnswerView(Number(q.questionType), q.answerChoices)}
            </Grid>
          </Grid>
          {renderAdditionalAnswer()}
        </CardBody>
      </CardComponent>
    ));
  }

  function renderAssignedUser() {
    if (!getQuestionsRes) return;

    const assignedUser = Object.values(getQuestionsRes?.assignedUsers)[0] as IUser;

    assignedUser.birthDay = new Date();

    const title = (
      <Grid container flexDirection={"row"}>
        <Grid item md={12}>
          <p className={classes.removeMargin}>{getUserFullName(assignedUser)}</p>
        </Grid>
        <Grid item md={12}>
          <p className={classes.removeMargin}>
            {assignedUser.birthDay.toLocaleDateString()}
          </p>
        </Grid>
      </Grid>
    );

    return (
      <Grid item>
        <CardHeader
          avatar={<Avatar alt={assignedUser.firstName} src={assignedUser.image} />}
          title={title}
        />
      </Grid>
    );
  }

  return (
    <Grid container style={{ minHeight: "80vh" }} flexDirection="column">
      {isLoading && questions ? (
        renderLoader()
      ) : (
        <>
          {renderAssignedUser()}
          <Wizard
            footer={
              questions ? (
                <WizardFooter
                  onNextStep={onNextStep}
                  onPrevStep={onPrevStep}
                  getWiz={(wiz) => {
                    wizardValuesRef.current = wiz;
                  }}
                  // {...wizard}
                />
              ) : null
            }
          >
            {renderSteps({ questions })}
          </Wizard>
        </>
      )}
    </Grid>
  );
};

export default AssignedQuestionnaire;

type IWizardFooterProps = {
  getWiz: (wiz: WizardValues) => void;
  onNextStep: any;
  onPrevStep: any;
};

function WizardFooter(props: IWizardFooterProps) {
  const { onNextStep, onPrevStep, getWiz } = props;
  const wizard = useWizard();
  const { nextStep, previousStep, isLastStep, isFirstStep, activeStep, stepCount } =
    wizard;

  const [flexDirection] = useFlexDirection();

  React.useEffect(() => {
    getWiz?.(wizard);
  }, [wizard]);

  return (
    <Grid item container justifyContent={"center"} paddingTop={"16px"}>
      <Grid item container justifyContent={"center"} flexDirection={flexDirection}>
        <Grid item>
          <IconButton
            disabled={isFirstStep}
            title="Back"
            aria-label="Back"
            size="small"
            color="info"
            onClick={onPrevStep}
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
            onClick={onNextStep}
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
