using System.Collections.Generic;
using Tazeez.Common.Extensions;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Request;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Users
{
    public interface IUserManager : IManager
    {
        /// <summary>
        /// Get children
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <returns></returns>
        PagedResult<ChildrenResponse> GetChildren(UserModel currentUser, int page = 1, int pageSize = 10, string searchText = "");

        /// <summary>
        /// Add children
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <param name="addChildrenRequest">Add request request</param>
        /// <returns></returns>
        int AddChildren(UserModel currentUser, AddChildrenRequest addChildrenRequest);

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
        /// Update or create doctor
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <param name="request">Add model</param>
        /// <returns></returns>
        DoctorModel PutDoctor(UserModel currentUser, AddDoctorRequest request);

        /// <summary>
        /// Get doctors
        /// </summary>
        /// <param name="page">Page</param>
        /// <param name="pageSize">Page size</param>
        /// <returns></returns>
        PagedResult<DoctorModel> GetDoctors(int page = 1, int pageSize = 10);

        /// <summary>
        /// Search users
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <param name="page">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="searchText">Search text</param>
        /// <returns></returns>
        PagedResult<SearchUserModel> SearchUsers(UserModel currentUser, int page = 1, int pageSize = 10, string searchText = "");

        /// <summary>
        /// Archived doctor
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <param name="doctorId">Doctor id</param>
        /// <returns></returns>
        void ArchivedDoctor(UserModel currentUser, int doctorId);

        /// <summary>
        /// Get doctor
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <param name="doctorId">Doctor id</param>
        /// <returns></returns>
        DoctorModel GetDoctor(UserModel currentUser, int doctorId);

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
        
        /// <summary>
        /// Update my profile
        /// </summary>
        /// <param name="currentUser">Logged in user</param>
        /// <param name="request">Update prfile request model</param>
        /// <returns></returns>
        UserModel UpdateProfile(UserModel currentUser, UpdateProfileRequestModel request);
    }
}
