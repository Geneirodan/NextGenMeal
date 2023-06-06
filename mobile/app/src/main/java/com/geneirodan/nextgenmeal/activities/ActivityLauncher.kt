package com.geneirodan.nextgenmeal.activities

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.lifecycleScope
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.utils.Role
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
                val response = client.get("account/role")
                Log.d("status", response.status.toString())
                this@ActivityLauncher.let {
                    startActivity(
                        if (response.status == HttpStatusCode.OK) {
                            when (response.body<String>()) {
                                "\"Customer\"" -> {
                                    role = Role.CUSTOMER
                                    Intent(it, MainActivity::class.java)
                                }

                                "\"Employee\"" -> {
                                    role = Role.EMPLOYEE
                                    Intent(it, MainActivity::class.java)
                                }

                                else -> Intent(it, LoginActivity::class.java)
                            }
                        } else Intent(it, LoginActivity::class.java)
                    )
                }
                finish()
            }
        }
        val splashScreen = installSplashScreen()
        splashScreen.setKeepOnScreenCondition { true }
        super.onCreate(savedInstanceState)
    }
}