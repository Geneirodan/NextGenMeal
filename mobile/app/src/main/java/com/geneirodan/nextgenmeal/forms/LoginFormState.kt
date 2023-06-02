package com.geneirodan.nextgenmeal.forms

import com.geneirodan.nextgenmeal.utils.FormState
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.utils.InputType

enum class LoginFormField{EMAIL, PASSWORD}
data class LoginFormState(
    val email : InputState = InputState(type = InputType.EMAIL),
    val password: InputState = InputState(type = InputType.PASSWORD),
) : FormState() {
    override val validableStates: List<InputState> = listOf(email, password)
}