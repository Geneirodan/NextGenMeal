package com.geneirodan.nextgenmeal.viewmodels

import android.content.Context
import androidx.compose.material.ScaffoldState
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.viewModelScope
import com.geneirodan.nextgenmeal.Api
import com.geneirodan.nextgenmeal.data.requests.RegisterRequest
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.utils.InputType
import com.geneirodan.nextgenmeal.viewmodels.abstractions.FormViewModel
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.launch

class RegisterViewModel : FormViewModel() {
    val name = mutableStateOf(InputState(type = InputType.TEXT))
    val email = mutableStateOf(InputState(type = InputType.EMAIL))
    val password = mutableStateOf(InputState(type = InputType.PASSWORD))
    val confirmPassword = mutableStateOf(InputState(type = InputType.PASSWORD))
    override val fields = mutableListOf(name, email, password, confirmPassword)

    fun register(
        openDialog: MutableState<Boolean>,
        scaffoldState: ScaffoldState,
        context: Context
    ) {
        onFocusChanged(context)
        if (validate()) viewModelScope.launch {
            val response = Api.post<RegisterRequest>(
                url = "Account/Register",
                params = mapOf(Pair("callbackUrl", "/")),
                body = RegisterRequest(
                    name.value.text,
                    email.value.text,
                    password.value.text,
                    confirmPassword.value.text
                )
            )
            if (response.status == HttpStatusCode.Created) {
                openDialog.value = true
            } else Api.handleError(response, scaffoldState)
        }
    }
}