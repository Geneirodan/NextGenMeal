package com.geneirodan.nextgenmeal

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import com.geneirodan.nextgenmeal.utils.LocaleUtil
import com.geneirodan.nextgenmeal.utils.PreferencesCookiesStorage
import com.geneirodan.nextgenmeal.utils.Storage
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.cookies.HttpCookies
import io.ktor.client.plugins.defaultRequest
import io.ktor.serialization.kotlinx.json.json

class NextGenMealApp : Application() {
    companion object {
        lateinit var preferences: SharedPreferences
        val client: HttpClient
            get() = HttpClient(CIO) {
                expectSuccess = false
                install(HttpCookies) { storage = PreferencesCookiesStorage(preferences) }
                install(ContentNegotiation) { json() }
                defaultRequest {
                    url("https://4qrs2kgg-7168.euw.devtunnels.ms/api/")
                }
            }
    }

    val storage: Storage by lazy { Storage(this) }

    override fun attachBaseContext(base: Context) =
        super.attachBaseContext(
            LocaleUtil.getLocalizedContext(
                base,
                Storage(base).getPreferredLocale()
            )
        )
}