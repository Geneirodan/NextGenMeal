package com.geneirodan.nextgenmeal.utils

data class InputState(
    val text: String = "",
    val isValid: Boolean = true,
    val type: InputType,
    val errorMessage: String = ""
)