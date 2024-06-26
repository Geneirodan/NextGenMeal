﻿using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace Services
{
    internal static class Utils
    {
        public static int ItemsPerPage => 10;
        public static Result HandleResult(IdentityResult result) => result.Succeeded
            ? Result.Ok()
            : Result.Fail(result.Errors.Select(e => e.Description));
    }
}
