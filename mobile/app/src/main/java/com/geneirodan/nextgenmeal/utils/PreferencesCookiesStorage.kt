package com.geneirodan.nextgenmeal.utils

import android.content.SharedPreferences
import android.util.Log
import io.ktor.client.plugins.cookies.CookiesStorage
import io.ktor.http.*

class PreferencesCookiesStorage(private val preferences: SharedPreferences) : CookiesStorage {
    override suspend fun addCookie(requestUrl: Url, cookie: Cookie) {
        with(preferences.edit()) {
            this.putString(cookie.name, cookie.value)
            apply()
        }
    }

    override fun close() {}

    override suspend fun get(requestUrl: Url): List<Cookie> = mutableListOf<Cookie>().apply {
        preferences.all.forEach { cookie ->
            try {
                add(Cookie(cookie.key, cookie.value.toString()))
            } catch (e: Exception) {
                Log.e("Cookie", "Bad cookie")
            }
        }
    }
}