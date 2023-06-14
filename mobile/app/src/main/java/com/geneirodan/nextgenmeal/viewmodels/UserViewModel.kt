package com.geneirodan.nextgenmeal.viewmodels

import android.content.Context
import android.content.Intent
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.viewModelScope
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.activities.ActivityLauncher
import com.geneirodan.nextgenmeal.activities.BaseActivity
import com.geneirodan.nextgenmeal.activities.BaseActivity.Companion.role
import com.geneirodan.nextgenmeal.Api
import com.geneirodan.nextgenmeal.data.Employee
import com.geneirodan.nextgenmeal.data.User
import com.geneirodan.nextgenmeal.data.requests.ChangeNameRequest
import com.geneirodan.nextgenmeal.utils.GoogleAuthResultContract.Companion.getGoogleSignInClient
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.utils.InputType
import com.geneirodan.nextgenmeal.utils.Role
import com.geneirodan.nextgenmeal.viewmodels.abstractions.FormViewModel
import io.ktor.client.call.body
import io.ktor.client.request.delete
import io.ktor.client.request.get
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.launch

class UserViewModel : FormViewModel() {
    val user = mutableStateOf(User())
    val newName = mutableStateOf(InputState(type = InputType.TEXT))
    override val fields = listOf(newName)

    init {
        viewModelScope.launch {
            val response = client.get("Account/Info")
            if (response.status == HttpStatusCode.OK) user.value =
                if (role == Role.EMPLOYEE) response.body<Employee>()
                else response.body()
            newName.value = newName.value.copy(text = user.value.name)
        }
    }


    fun logout(context: Context) {
        getGoogleSignInClient(context).signOut().addOnCompleteListener {
            viewModelScope.launch {
                client.delete("account/logout")
                context.startActivity(Intent(context, ActivityLauncher::class.java))
                (context as BaseActivity).finishAffinity()
            }
        }
    }

    fun changeName(context: Context) {
        viewModelScope.launch {
            onFocusChanged(context)
            if (newName.value.isValid) {
                val response = Api.patch(
                    "Account/ChangeName", body = ChangeNameRequest(newName.value.text)
                )
                if (response.status == HttpStatusCode.OK) user.value = user.value.copy(name = newName.value.text)
                else Api.handleError(response, BaseActivity.scaffoldState)
            }
        }
    }
}