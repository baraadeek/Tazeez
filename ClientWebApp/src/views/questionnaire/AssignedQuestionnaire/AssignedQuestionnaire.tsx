import * as React from "react";
import { Wizard, useWizard } from "react-use-wizard";
import { CircularProgress, Grid, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getQuestionnaireQuestionsAction,
  IGetQuestionnaireQuestionsRes,
} from "store/actions/questions/questionsActionCretors";
import { useParams } from "react-router-dom";
import { IQuestion } from "common/sharedInterfaces/modelsInterfaces";
import CardComponent from "components/core-components/card/CardComponent";
import CardBody from "components/core-components/card/CardBody";
import { useMountedState } from "common/hooks/appHooks";

interface IAssignedQuestionnaireProps {}

const AssignedQuestionnaire: React.FunctionComponent<
  IAssignedQuestionnaireProps
> = (props) => {
  const [getQuestionsRes, setGetQuestionsRes] =
    useMountedState<IGetQuestionnaireQuestionsRes | null>(null);

  const [isLoading, setIsLoading] = useMountedState(false);
  const params = useParams<{ id: string }>();

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
      <Grid item container flexGrow={1} key={q.questionId}>
        <CardComponent>
          <CardBody>
            <Grid item>
              <h4><b>Question</b>: {q.questionText}</h4>
            </Grid>
          </CardBody>
        </CardComponent>
      </Grid>
    ));
  }

  return (
    <Grid container style={{ minHeight: "80vh" }} flexDirection="column">
      {isLoading && getQuestionsRes?.questions.data.length ? (
        renderLoader()
      ) : (
        <Wizard footer={<WizardFooter />}>
          {renderSteps({ questions: getQuestionsRes?.questions.data })}
        </Wizard>
      )}
    </Grid>
  );
};

export default AssignedQuestionnaire;

function WizardFooter() {
  const {
    nextStep,
    previousStep,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
  } = useWizard();

  return (
    <Grid item container justifyContent={"center"}>
      <Grid item container justifyContent={"center"}>
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
