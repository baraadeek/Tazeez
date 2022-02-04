namespace Tazeez.Models.Responses
{
    public class QuestionChoiceResponse
    {
        public int Id { get; set; }

        public decimal Score { get; set; }

        public string Choice { get; set; }

        public bool IsChecked { get; set; }
    }
}
