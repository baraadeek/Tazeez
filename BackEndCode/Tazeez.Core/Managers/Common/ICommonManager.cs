using System.Collections.Generic;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Core.Managers.Common
{
    public interface ICommonManager : IManager
    {
        void ContactWithUS(ContactRequestModel contactRequestModel);

        List<ContactRequestModel> GetContactWithUS(UserModel currentUser);
        
        UserModel GetUserRole(UserModel userModel);
    }
}
