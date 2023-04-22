﻿using API.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces.CRUD;
using Services.Models;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [Route(Routes.CrudRoute)]
    public abstract class CrudController<TModel, TRequest> : BaseController
        where TModel : EntityModel
        where TRequest : IRequestBody
    {
        protected readonly ICrudService<TModel> service;

        public CrudController(ICrudService<TModel> service) => this.service = service;

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<ActionResult<TModel>> AddAsync([FromBody] TRequest request)
        {
            var model = request.Adapt<TModel>();
            var result = await service.AddAsync(User, model);
            return HandleResult(result);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> EditAsync(int id, [FromBody] TRequest request)
        {
            var model = request.Adapt<TModel>();
            var result = await service.EditAsync(User, model);
            return HandleResult(result);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async virtual Task<IActionResult> DeleteAsync(int id)
        {
            var result = await service.DeleteAsync(User, id);
            return HandleResult(result);
        }
    }
}
