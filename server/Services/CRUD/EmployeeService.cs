using Azure;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Users;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Services.Interfaces.CRUD;
using Services.Models;
using Services.Models.Users;
using System;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Diagnostics.Metrics;
using Microsoft.EntityFrameworkCore;

namespace Services.CRUD
{
    public class EmployeeService : CrudService<EmployeeModel, Employee>
    {

        public EmployeeService(ApplicationContext context, UserManager<User> userManager) : base(context, userManager)
        {
        }

        
    }
}
