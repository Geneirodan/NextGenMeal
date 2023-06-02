package com.geneirodan.nextgenmeal.activities

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Scaffold
import androidx.compose.material.ScaffoldState
import androidx.compose.material.SnackbarHost
import androidx.compose.material.Text
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.domain
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.protocol
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.components.CustomInputField
import com.geneirodan.nextgenmeal.components.ErrorSnackbar
import com.geneirodan.nextgenmeal.components.LangDropDown
import com.geneirodan.nextgenmeal.data.ProblemDetails
import com.geneirodan.nextgenmeal.events.LoginEvent
import com.geneirodan.nextgenmeal.forms.LoginFormField
import com.geneirodan.nextgenmeal.google.AuthResultContract
import com.geneirodan.nextgenmeal.requests.LoginRequest
import com.geneirodan.nextgenmeal.requests.ProviderRequest
import com.geneirodan.nextgenmeal.viewmodels.LoginViewModel
import com.google.android.gms.common.api.ApiException
import io.ktor.client.call.body
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType
import kotlinx.coroutines.launch

class LoginActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { LoginContent() }
    }

    @Preview(showBackground = true)
    @Composable
    fun LoginContent(loginViewModel: LoginViewModel = viewModel()) {
        val context = LocalContext.current
        val coroutineScope = rememberCoroutineScope()
        val scaffoldState = rememberScaffoldState()
        val openLangDialog = remember { mutableStateOf(false) }
        val (email, password) = loginViewModel.state.value
        val authResultLauncher =
            rememberLauncherForActivityResult(contract = AuthResultContract()) { task ->
                try {
                    val account = task?.getResult(ApiException::class.java)
                    account?.let {
                        coroutineScope.launch {
                            val response =
                                client.post("$protocol://$domain/api/account/GoogleAuth") {
                                    contentType(ContentType.Application.Json)
                                    setBody(
                                        ProviderRequest(it.id, it.idToken)
                                    )
                                }
                            handleResponse(response, context, scaffoldState)
                        }
                    }
                } catch (e: ApiException) {
                    Log.e("Exception", "")
                    e.message?.let { Log.e("Google", it) }
                }
            }

        Scaffold(
            modifier = Modifier.padding(15.dp),
            scaffoldState = scaffoldState,
            snackbarHost = { SnackbarHost(it) { data -> ErrorSnackbar(message = data.message) } },
            topBar = {
                Row(modifier = Modifier.fillMaxWidth() ,horizontalArrangement = Arrangement.End) {
                    LangDropDown(open = openLangDialog)
                }
            }
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(it),
                verticalArrangement = Arrangement.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Image(painter = painterResource(id = R.mipmap.icon), "")
                    Text(text = stringResource(R.string.login))
                    with(email) {
                        CustomInputField(
                            value = text,
                            label = {Text(stringResource(R.string.email))},
                            onFocusChange = {
                                loginViewModel.createEvent(
                                    LoginEvent.FocusChange(
                                        LoginFormField.EMAIL
                                    )
                                )
                            },
                            onValueChange = { value ->
                                loginViewModel.createEvent(
                                    LoginEvent.EnteredEmail(
                                        value
                                    )
                                )
                            },
                            isError = !isValid,
                            errorMessage = errorMessage,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    with(password) {
                        CustomInputField(
                            value = text,
                            label = {Text(stringResource(R.string.password))},
                            onFocusChange = {
                                loginViewModel.createEvent(
                                    LoginEvent.FocusChange(
                                        LoginFormField.PASSWORD
                                    )
                                )
                            },
                            onValueChange = { value ->
                                loginViewModel.createEvent(
                                    LoginEvent.EnteredPassword(
                                        value
                                    )
                                )
                            },
                            isError = !isValid,
                            errorMessage = errorMessage,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                    Button(
                        onClick = {
                            loginViewModel.createEvent(
                                LoginEvent.FocusChange(
                                    LoginFormField.EMAIL
                                )
                            )
                            loginViewModel.createEvent(
                                LoginEvent.FocusChange(
                                    LoginFormField.PASSWORD
                                )
                            )
                            if (loginViewModel.state.value.validate())
                                coroutineScope.launch {
                                    val response =
                                        client.post("$protocol://$domain/api/account/login") {
                                            contentType(ContentType.Application.Json)
                                            setBody(LoginRequest(email.text, password.text))
                                        }
                                    handleResponse(response, context, scaffoldState)
                                }
                        },
                        modifier = Modifier.fillMaxWidth()
                    ) { Text(text = stringResource(R.string.log_in)) }
                    Button(
                        onClick = {},
                        modifier = Modifier.fillMaxWidth()
                    ) { Text(text = "Register") }
                    Button(
                        onClick = { authResultLauncher.launch(1) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(40.dp),
                        colors = ButtonDefaults.buttonColors(
                            backgroundColor = Color.Black,
                            contentColor = Color.White
                        )
                    ) {
                        Image(painterResource(id = R.drawable.google), "")
                        Text("Sign in with Google")
                    }
                }
            }
        }
    }


    private suspend fun handleResponse(
        response: HttpResponse,
        context: Context,
        scaffoldState: ScaffoldState
    ) {
        if (response.status == HttpStatusCode.OK) {
            context.startActivity(Intent(context, ActivityLauncher::class.java))
            (context as BaseActivity).finish()
        }
        else {
            val sb = StringBuilder()
            Log.d("Res", response.body())
            response.body<ProblemDetails>().errors?.forEach { (_, v) ->
                v.forEach { error -> sb.append("$error\n") }
            }
            if(sb.isNotEmpty())
                sb.deleteCharAt(sb.length - 1)
            scaffoldState.snackbarHostState.showSnackbar(sb.toString())
        }
    }


}