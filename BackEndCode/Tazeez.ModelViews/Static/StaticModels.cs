using System.Collections.Generic;

namespace Tazeez.Models.Static
{
    public static class StaticData
    {
        public static readonly List<int> TextAnswerQuestionType = new List<int>() { 3, 4, 5, 6 };

        public static readonly List<int> MultipleChoiceQuestion = new List<int>() { 1, 2 };

        public static readonly List<string> BusinessUnitObjectQuestion = new List<string>() { "BUOSingleObject", "BUOMultipleObjects" };

        public static readonly List<string> SupportedSortColumns = new List<string>() { "CreatedUtc", "DueDateUtc" };

        public static readonly List<string> SupportedRiskSortColumns = new List<string>() { "Priority", "CreatedUtc", "ReviewDateUtc" };

        public static readonly List<string> SupportedTaskSortColumns = new List<string>() { "CreatedUtc" };

        public static readonly List<int?> StatusSortValues = new List<int?>() { 11, 10, 3, 5, 7 };

        public static readonly List<int?> DuedateSortValues = new List<int?>() { 1, 2, 3 };

        public static readonly List<int?> RelationshipSortValues = new List<int?>() { 30, 29, 28, 27, 22, 21 };
    }
}
