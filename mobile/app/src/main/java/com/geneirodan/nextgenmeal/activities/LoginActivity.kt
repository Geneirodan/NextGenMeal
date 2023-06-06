package com.geneirodan.nextgenmeal.activities

import android.content.Intent
import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.SnackbarHost
import androidx.compose.material.Text
import androidx.compose.material.rememberScaffoldState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.components.CustomInputField
import com.geneirodan.nextgenmeal.components.ErrorSnackbar
import com.geneirodan.nextgenmeal.components.LangDropDown
import com.geneirodan.nextgenmeal.components.AppTheme
import com.geneirodan.nextgenmeal.viewmodels.LoginViewModel

class LoginActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                val scaffoldState = rememberScaffoldState()
                val loginViewModel: LoginViewModel = viewModel()
                val authResultLauncher = loginViewModel.rememberGoogleActivityResultLauncher(scaffoldState)
                Scaffold(modifier = Modifier.padding(15.dp),
                    scaffoldState = scaffoldState,
                    snackbarHost = { state -> SnackbarHost(state) { ErrorSnackbar(message = it.message) } },
                    topBar = {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.End
                        ) {
                            LangDropDown()
                        }
                    }) { paddingValues ->
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(paddingValues),
                        verticalArrangement = Arrangement.Center
                    ) {
                        loginViewModel.apply {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.spacedBy(10.dp)
                            ) {
                                Image(painter = painterResource(id = R.mipmap.icon), "")
                                Text(
                                    text = stringResource(R.string.login),
                                    style = MaterialTheme.typography.h3
                                )
                                CustomInputField(
                                    value = email,
                                    label = { Text(stringResource(R.string.email)) },
                                    modifier = Modifier.fillMaxWidth(),
                                    keyboardOptions = KeyboardOptions.Default.copy(
                                        keyboardType = KeyboardType.Email
                                    )
                                )
                                CustomInputField(
                                    value = password,
                                    label = { Text(stringResource(R.string.confirm_password)) },
                                    modifier = Modifier.fillMaxWidth(),
                                    visualTransformation = PasswordVisualTransformation(),
                                    keyboardOptions = KeyboardOptions.Default.copy(
                                        keyboardType = KeyboardType.Password
                                    )
                                )
                                Button(
                                    onClick = { login(this@LoginActivity, scaffoldState) },
                                    modifier = Modifier.fillMaxWidth()
                                ) { Text(text = stringResource(R.string.log_in)) }
                                Button(
                                    onClick = {
                                        startActivity(
                                            Intent(
                                                this@LoginActivity,
                                                RegisterActivity::class.java
                                            )
                                        )
                                    },
                                    modifier = Modifier.fillMaxWidth()
                                ) { Text(text = "Register") }
                                Button(
                                    onClick = { authResultLauncher.launch(1) },
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(40.dp),
                                    colors = ButtonDefaults.buttonColors(
                                        backgroundColor = Color.Black, contentColor = Color.White
                                    )
                                ) {
                                    Image(painterResource(id = R.drawable.google), "")
                                    Text("Sign in with Google")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}



