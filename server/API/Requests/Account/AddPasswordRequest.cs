﻿using System.ComponentModel.DataAnnotations;
using Utils.Constants;

namespace API.Requests.Account
{
    public class AddPasswordRequest
    {

        [DataType(DataType.Password), Required]
        public string NewPassword { get; set; } = null!;

        [DataType(DataType.Password), Required, Compare(nameof(NewPassword), ErrorMessage = Errors.PASSWORD_ARE_NOT_THE_SAME)]
        public string ConfirmNewPassword { get; set; } = null!;
    }
}
