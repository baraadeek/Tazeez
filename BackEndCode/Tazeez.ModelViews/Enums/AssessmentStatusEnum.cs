using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tazeez.ModelViews.Enums
{
    public enum AssessmentStatusEnum
    {
        [Description("Open")]
        Open = 0,
        [Description("In Progress")]
        InProgress = 1,
        [Description("In Review")]
        InReview = 2,
        [Description("Completed")]
        Completed = 3,
        [Description("Cancelled")]
        Cancelled = 4
    }
}
