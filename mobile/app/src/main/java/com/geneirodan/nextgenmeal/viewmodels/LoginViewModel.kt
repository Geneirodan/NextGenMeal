package com.geneirodan.nextgenmeal.viewmodels

import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.geneirodan.nextgenmeal.events.LoginEvent
import com.geneirodan.nextgenmeal.forms.LoginFormField
import com.geneirodan.nextgenmeal.forms.LoginFormState
import com.geneirodan.nextgenmeal.utils.validateEmail
import com.geneirodan.nextgenmeal.utils.validatePassword


class LoginViewModel : ViewModel() {
    private val _state = mutableStateOf(LoginFormState())
    val state = _state

    fun createEvent(event: LoginEvent) =
        when (event) {
            is LoginEvent.EnteredEmail ->
                _state.value = state.value.copy(
                    email = state.value.email.copy(
                        text = event.value
                    )
                )

            is LoginEvent.EnteredPassword ->
                _state.value = state.value.copy(
                    password = state.value.password.copy(
                        text = event.value
                    )
                )

            is LoginEvent.FocusChange ->
                when (event.focusFieldName) {
                    LoginFormField.EMAIL -> {
                        val (isValid, error) = validateEmail(state.value.email.text)
                        _state.value = state.value.copy(
                            email = state.value.email.copy(
                                isValid = isValid,
                                errorMessage = error
                            )
                        )
                    }

                    LoginFormField.PASSWORD -> {
                        val (isValid, error) = validatePassword(state.value.password.text)
                        _state.value = state.value.copy(
                            password = state.value.password.copy(
                                isValid = isValid,
                                errorMessage = error
                            )
                        )
                    }
                }
        }
}