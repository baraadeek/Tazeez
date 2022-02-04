using AutoMapper;
using JustProtect.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Tazeez.Common.Extensions;
using Tazeez.DB.Models.DB;
using Tazeez.Enums;
using Tazeez.Infrastructure;
using Tazeez.Models;
using Tazeez.Models.Models;
using Tazeez.Models.QuestionTypes;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;
using Tazeez.ModelViews.Response;

namespace Tazeez.Core.Managers.Common
{
    public class CommonManager : ICommonManager
    {
        private readonly TazeezContext _context;
        private readonly IMapper _mapper;
        private readonly IConfigurationSettings _configurationSettings;

        public CommonManager(TazeezContext context, IMapper mapper, IConfigurationSettings configurationSettings)
        {
            _context = context;
            _mapper = mapper;
            _configurationSettings = configurationSettings;
        }

        public void AddContactWithUS(ContactUsRequestModel contactRequestModel)
        {
            _context.ContactRequest.Add(new ContactRequest 
            {
                UserName = contactRequestModel.UserName,
                Message = contactRequestModel.Message,
                Email = contactRequestModel.Email,
                PhoneNumber = contactRequestModel.PhoneNumber
            });

            _context.SaveChanges();
        }

        public UserModel GetUserRole(UserModel currentUser)
        {
            var user = _context.User
                               .Include(a => a.Doctor)
                               .FirstOrDefault(a => a.Id == currentUser.Id);

            return _mapper.Map<UserModel>(user);
        }

        public PagedResult<ContactResponseModel> GetContactWithUS(UserModel currentUser, int page, int PageSize)
        {
            if (!currentUser.IsAdmin || !currentUser.IsDoctor)
            {
                throw new Exception("You don't have permission to see this resource");
            }

            var data = _context.ContactRequest
                               .OrderBy(a => a.CreatedDateUTC)
                               .GetPaged(page, PageSize);

            return _mapper.Map<PagedResult<ContactResponseModel>>(data);
        }

        public void ArchiveContactWithUS(UserModel currentUser, int id)
        {
            if (!currentUser.IsAdmin || !currentUser.IsDoctor)
            {
                throw new Exception("You don't have permission to see this resource");
            }

            var data = _context.ContactRequest
                               .FirstOrDefault(a => a.Id == id)
                               ?? throw new ServiceValidationException("Id not found");

            data.Archived = true;
            _context.SaveChanges();
        }
    }
}
