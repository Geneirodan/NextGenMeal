package com.geneirodan.nextgenmeal.utils

import android.content.Context
import android.text.TextUtils
import android.util.Patterns.EMAIL_ADDRESS
import com.geneirodan.nextgenmeal.R

enum class InputType(var validate: (String, Context) -> Validation) {
    TEXT({ it, context ->
        Validation(
            !TextUtils.isEmpty(it), context.getString(R.string.required)
        )
    }),
    EMAIL({ it, context ->
        var validation = InputType.TEXT.validate(it, context)
        if (validation.isValid) validation =
            Validation(EMAIL_ADDRESS.matcher(it).matches(), context.getString(R.string.invalid_email))
        validation
    }),
    PASSWORD({ it, context ->
        var validation = InputType.TEXT.validate(it, context)
        if (validation.isValid) validation = Validation(
            it.length >= 8,
            context.getString(R.string.password_should_be_of_minimum_8_characters_length)
        )
        if (validation.isValid) validation = Validation(
            "[a-z]".toRegex().containsMatchIn(it),
            context.getString(R.string.password_should_contain_at_least_1_lowercase_letter)
        )
        if (validation.isValid) validation = Validation(
            "[A-Z]".toRegex().containsMatchIn(it),
            context.getString(R.string.password_should_contain_at_least_1_uppercase_letter)
        )
        if (validation.isValid) validation = Validation(
            "[0-9]".toRegex().containsMatchIn(it),
            context.getString(R.string.password_should_contain_at_least_1_digit)
        )
        validation
    }),
    NUMBER({ it, context ->
        Validation(
            "^\\d+\$".toRegex().matches(it), context.getString(R.string.invalid_number)
        )
    })
}