package com.geneirodan.nextgenmeal.activities

import android.os.Bundle
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedButton
import androidx.compose.material.Scaffold
import androidx.compose.material.SnackbarHost
import androidx.compose.material.Text
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
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
import com.geneirodan.nextgenmeal.viewmodels.RegisterViewModel

class RegisterActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                val scaffoldState = rememberScaffoldState()
                val openDialog = remember { mutableStateOf(false) }
                val registerViewModel: RegisterViewModel = viewModel()
                BackHandler { finish() }
                Scaffold(modifier = Modifier.padding(15.dp),
                    scaffoldState = scaffoldState,
                    snackbarHost = { SnackbarHost(it) { data -> ErrorSnackbar(message = data.message) } },
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
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.spacedBy(10.dp)
                        ) {
                            Image(painter = painterResource(id = R.mipmap.icon), "")
                            Text(
                                text = stringResource(R.string.register),
                                style = MaterialTheme.typography.h3
                            )
                            registerViewModel.apply {
                                CustomInputField(
                                    value = name,
                                    label = { Text(stringResource(R.string.username)) },
                                    modifier = Modifier.fillMaxWidth()
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
                                    label = { Text(stringResource(R.string.password)) },
                                    modifier = Modifier.fillMaxWidth(),
                                    visualTransformation = PasswordVisualTransformation(),
                                    keyboardOptions = KeyboardOptions.Default.copy(
                                        keyboardType = KeyboardType.Password
                                    )
                                )
                                CustomInputField(
                                    value = confirmPassword,
                                    label = { Text(stringResource(R.string.confirm_password)) },
                                    modifier = Modifier.fillMaxWidth(),
                                    visualTransformation = PasswordVisualTransformation(),
                                    keyboardOptions = KeyboardOptions.Default.copy(
                                        keyboardType = KeyboardType.Password
                                    )
                                )
                                Button(
                                    onClick = {
                                        register(openDialog, scaffoldState, this@RegisterActivity)
                                    }, modifier = Modifier.fillMaxWidth()
                                ) {
                                    Text(text = stringResource(R.string.register))
                                }
                            }
                            if (openDialog.value) AlertDialog(onDismissRequest = {
                                finish()
                            }, text = {
                                Text(stringResource(R.string.account_successfully_created))
                            }, buttons = {
                                OutlinedButton(onClick = { finish() }) {
                                    Text(stringResource(R.string.ok))
                                }
                            })
                        }
                    }
                }
            }
        }
    }
}
