using Tazeez.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Users
{
    public interface IUserManager : IManager
    {
        /// <summary>
        /// Get Name
        /// </summary>
        /// <param name="userId">User id</param>
        /// <returns></returns>
        string GetName(int userId);

        /// <summary>
        /// Sign Up
        /// </summary>
        /// <param name="signUpRequest">Signup request model</param>
        /// <returns></returns>
        UserModel SignUp(SignUpRequest signUpRequest);

        /// <summary>
        /// Login method
        /// </summary>
        /// <param name="loginRequest">Login request moethod</param>
        /// <returns></returns>
        LoginResponse Login(LoginRequest loginRequest);

        /// <summary>
        /// Get user
        /// </summary>
        /// <param name="id">User id</param>
        /// <returns></returns>
        UserModel GetUser(int id);
    }
}
