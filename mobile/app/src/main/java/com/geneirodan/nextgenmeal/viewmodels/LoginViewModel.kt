package com.geneirodan.nextgenmeal.viewmodels

import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.activity.compose.ManagedActivityResultLauncher
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.compose.material.ScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewModelScope
import com.geneirodan.nextgenmeal.NextGenMealApp
import com.geneirodan.nextgenmeal.activities.ActivityLauncher
import com.geneirodan.nextgenmeal.activities.BaseActivity
import com.geneirodan.nextgenmeal.Api
import com.geneirodan.nextgenmeal.data.requests.LoginRequest
import com.geneirodan.nextgenmeal.data.requests.ProviderRequest
import com.geneirodan.nextgenmeal.utils.GoogleAuthResultContract
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.utils.InputType
import com.geneirodan.nextgenmeal.viewmodels.abstractions.FormViewModel
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import kotlinx.coroutines.launch

open class LoginViewModel : FormViewModel() {
    val email = mutableStateOf(InputState(type = InputType.EMAIL))
    val password = mutableStateOf(InputState(type = InputType.PASSWORD))
    override val fields = mutableListOf(email, password)
    fun login(context: Context, scaffoldState: ScaffoldState) {
        onFocusChanged(context)
        if (validate())
            viewModelScope.launch {
                val response = Api.post(
                    url = "Account/Login",
                    body = LoginRequest(
                        email.value.text,
                        password.value.text
                    )
                )
                handleLoginResponse(response, context, scaffoldState)
            }
    }

    @Composable
    fun rememberGoogleActivityResultLauncher(scaffoldState: ScaffoldState): ManagedActivityResultLauncher<Int, Task<GoogleSignInAccount>?> {
        val context = LocalContext.current
        val coroutineScope = rememberCoroutineScope()
        return rememberLauncherForActivityResult(contract = GoogleAuthResultContract()) { task ->
            try {
                val account = task?.getResult(ApiException::class.java)
                account?.let {
                    coroutineScope.launch {
                        val response = NextGenMealApp.client.post("account/GoogleAuth") {
                            contentType(ContentType.Application.Json)
                            setBody(
                                ProviderRequest(it.id, it.idToken)
                            )
                        }
                        handleLoginResponse(response, context, scaffoldState)
                    }
                }
            } catch (e: ApiException) {
                Log.e("Exception", "")
                e.message?.let { Log.e("Google", it) }
            }
        }
    }
    private suspend fun handleLoginResponse(
        response: HttpResponse, context: Context, scaffoldState: ScaffoldState
    ) {
        if (response.status == HttpStatusCode.OK) {
            context.startActivity(Intent(context, ActivityLauncher::class.java))
            (context as BaseActivity).finish()
        } else Api.handleError(response, scaffoldState)
    }
}