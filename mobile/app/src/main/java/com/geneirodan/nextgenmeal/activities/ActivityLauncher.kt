package com.geneirodan.nextgenmeal.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.lifecycleScope
import com.geneirodan.nextgenmeal.NextGenMealApp
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.domain
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.protocol
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ActivityLauncher : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        lifecycleScope.launch {
            withContext(Dispatchers.Default) {
                val response = client.get("$protocol://$domain/api/account/role")
                Log.d("status", response.status.toString())
                startActivity(
                    if (response.status == HttpStatusCode.OK) {
                        when (response.body<String>()) {
                            "\"Customer\"" -> Intent(context, CustomerActivity::class.java)
                            "\"Employee\"" -> Intent(context, EmployeeActivity::class.java)
                            else -> Intent(context, LoginActivity::class.java)
                        }
                    } else Intent(context, LoginActivity::class.java)
                )
                finish()
            }
        }
        val splashScreen = installSplashScreen()
        splashScreen.setKeepOnScreenCondition{true}
        super.onCreate(savedInstanceState)
    }
}