package com.geneirodan.nextgenmeal.utils

enum class InputType { TEXT, EMAIL, PASSWORD, NUMBER }
data class InputState(
    val text: String = "",
    val isValid: Boolean = true,
    val type: InputType,
    val errorMessage: String = ""
)

abstract class FormState() {
    abstract val validableStates: List<InputState>
    open fun validate(): Boolean = validableStates.all{x -> x.isValid}
}