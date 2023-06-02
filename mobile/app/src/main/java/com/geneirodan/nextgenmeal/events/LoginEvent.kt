package com.geneirodan.nextgenmeal.events

import com.geneirodan.nextgenmeal.forms.LoginFormField

sealed class LoginEvent {
    data class EnteredEmail(val value: String) : LoginEvent()
    data class EnteredPassword(val value: String) : LoginEvent()
    data class FocusChange(val focusFieldName: LoginFormField) : LoginEvent()
}