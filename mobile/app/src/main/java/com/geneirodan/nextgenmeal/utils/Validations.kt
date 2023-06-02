package com.geneirodan.nextgenmeal.utils

import android.text.TextUtils
import android.util.Patterns.EMAIL_ADDRESS

data class Validation(val isValid: Boolean, val error: String)

fun validateString(value: String) = Validation(!TextUtils.isEmpty(value), "Required")

fun validateEmail(value: String): Validation {
    var validation = validateString(value)
    if (validation.isValid)
        validation = Validation(EMAIL_ADDRESS.matcher(value).matches(),"Invalid Email")
    return validation
}

fun validatePassword(value: String): Validation {
    var validation = validateString(value)
    if (validation.isValid)
        validation = Validation(value.length >= 8,"Password should be of minimum 8 characters length")
    if (validation.isValid)
        validation = Validation("[a-z]".toRegex().containsMatchIn(value), "Password should contain at least 1 lowercase letter")
    if (validation.isValid)
        validation = Validation("[A-Z]".toRegex().containsMatchIn(value), "Password should contain at least 1 uppercase letter")
    if (validation.isValid)
        validation = Validation("[0-9]".toRegex().containsMatchIn(value), "Password should contain at least 1 digit")
    return validation
}