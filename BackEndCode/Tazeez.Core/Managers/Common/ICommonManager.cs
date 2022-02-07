using System.Collections.Generic;
using Tazeez.Common.Extensions;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Common
{
    public interface ICommonManager : IManager
    {
        void AddContactWithUS(ContactUsRequestModel contactRequestModel);

        PagedResult<ContactResponseModel> GetContactWithUS(UserModel currentUser, int page, int PageSize);

        void ArchiveContactWithUS(UserModel currentUser, int id);
        
        UserModel GetUserRole(UserModel userModel);
    }
}
