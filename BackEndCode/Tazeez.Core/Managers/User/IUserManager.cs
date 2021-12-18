using Tazeez.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.User
{
    public interface IUserManager : IManager
    {
        string GetName();

        UserModel SignUp(SignUpRequest signUpRequest);

        LoginResponse Login(LoginRequest loginRequest);

        UserModel GetUser(int id);
    }
}
