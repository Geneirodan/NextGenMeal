package com.geneirodan.nextgenmeal.fragments

import android.content.Intent
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.platform.LocalContext
import androidx.core.content.ContextCompat.startActivity
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.domain
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.protocol
import com.geneirodan.nextgenmeal.activities.ActivityLauncher
import com.geneirodan.nextgenmeal.activities.BaseActivity
import com.geneirodan.nextgenmeal.activities.EmployeeActivity
import com.geneirodan.nextgenmeal.activities.LoginActivity
import com.geneirodan.nextgenmeal.google.getGoogleSignInClient
import io.ktor.client.call.body
import io.ktor.client.request.delete
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.launch

@Composable
fun Settings() {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    Text("Settings")
    Button(onClick = {
        getGoogleSignInClient(context).signOut().addOnCompleteListener {
            coroutineScope.launch {
                Log.d("Logout", "True")
                client.delete("$protocol://$domain/api/account/logout")
                context.startActivity(Intent(context, ActivityLauncher::class.java))
                (context as BaseActivity).finishAffinity()
            }
        }
    }) {

    }
}