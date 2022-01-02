namespace Tazeez.ModelViews.Request
{
    public class QuestionChoiceRequestModel
    {
        public int Id { get; set; }

        public string Choice { get; set; }

        public int Score { get; set; }

        public int DisplayOrder { get; set; }
    }
}
