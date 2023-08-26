using Microsoft.AspNetCore.Mvc;
using Services;

namespace API.Controllers;

[ApiController]
[Route(Routes.CrudRoute)]
public class DishTypeController : BaseController
{
    private readonly IDishTypeService service;
    
    public DishTypeController(IDishTypeService service) => this.service = service;
    
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<string>> GetAsync()
    {
        return await service.GetAsync();
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public virtual async Task<ActionResult<string>> AddAsync(string type)
    {
        var result = await service.AddAsync(type);
        return HandleResult(result);
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync(string type)
    {
        var result = await service.DeleteAsync(type);
        return HandleResult(result);
    }
}
