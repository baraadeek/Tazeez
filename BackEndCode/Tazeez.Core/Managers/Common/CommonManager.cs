using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using Tazeez.DB.Models.DB;
using Tazeez.Infrastructure;
using Tazeez.Models.Models;
using Tazeez.ModelViews;
using Tazeez.ModelViews.ModelViews;

namespace Tazeez.Core.Managers.Common
{
    public class CommonManager : ICommonManager
    {
        private readonly TazeezContext _context;
        private readonly IMapper _mapper;
        private readonly IConfigurationSettings _configurationSettings;

        public CommonManager(TazeezContext context,
                           IMapper mapper,
                           IConfigurationSettings configurationSettings)
        {
            _context = context;
            _mapper = mapper;
            _configurationSettings = configurationSettings;
        }

        public void ContactWithUS(ContactRequestModel contactRequestModel)
        {
            _context.ContactRequests.Add(new ContactRequest 
            {
                FirstName = contactRequestModel.FirstName,
                LastName = contactRequestModel.LastName,
                Message = contactRequestModel.Message,
                Email = contactRequestModel.Email,
                PhoneNumber = contactRequestModel.PhoneNumber
            });

            _context.SaveChanges();
        }

        public UserModel GetUserRole(UserModel currentUser)
        {
            var user = _context.Users.FirstOrDefault(a => a.Id == currentUser.Id);
            
            return _mapper.Map<UserModel>(user);
        }

        public List<ContactRequestModel> GetContactWithUS(UserModel currentUser)
        {
            if (!currentUser.IsAdmin)
            {
                throw new Exception("You don't have permission to see this resource");
            }

            var data = _context.ContactRequests.OrderBy(a => a.CreatedDate).ToList();

            return _mapper.Map<List<ContactRequestModel>>(data);
        }
    }
}
