using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Utils.Constants;

namespace API.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected ActionResult<T> HandleResult<T>(Result<T> result) => result.IsSuccess ? result.ValueOrDefault : Error(result);
        protected ActionResult<T> HandleCreatedResult<T>(Result<T> result) => result.IsSuccess ? Created(result.ValueOrDefault) : Error(result);
        protected ActionResult HandleResult(Result result) => result.IsSuccess ? Ok() : Error(result);
        private ActionResult Error(ResultBase result)
        {
            return result.Errors[0].Message switch
            {
                Errors.NOT_FOUND => NotFound(result.Errors),
                Errors.FORBIDDEN => Forbid(result.Errors),
                _ => BadRequest(result.Errors)
            };
        }

        private ActionResult<T> Created<T>(T value) => CreatedAtAction(null, value);
        private ActionResult BadRequest(IEnumerable<IError> errors) => Error(errors, StatusCodes.Status400BadRequest);
        private ActionResult Forbid(IEnumerable<IError> errors) => Error(errors, StatusCodes.Status403Forbidden);
        private ActionResult NotFound(IEnumerable<IError> errors) => Error(errors, StatusCodes.Status404NotFound);
        private ActionResult Error(IEnumerable<IError> errors, int statusCode)
        {
            ModelStateDictionary pairs = new();
            foreach (var error in errors)
                pairs.AddModelError(Errors.COMMON, error.Message);
            return ValidationProblem(statusCode: statusCode, modelStateDictionary: pairs);
        }
    }
}
