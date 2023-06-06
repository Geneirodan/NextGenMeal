package com.geneirodan.nextgenmeal.activities

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.compose.material.ScaffoldState
import com.geneirodan.nextgenmeal.NextGenMealApp
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.preferences
import com.geneirodan.nextgenmeal.utils.LocaleUtil
import com.geneirodan.nextgenmeal.utils.Role
import com.geneirodan.nextgenmeal.utils.Storage

open class BaseActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        preferences = getSharedPreferences("NextGenMeal", Context.MODE_PRIVATE)
        super.onCreate(savedInstanceState)
    }

    private lateinit var oldPrefLocaleCode: String
    val storage: Storage by lazy {
        (application as NextGenMealApp).storage
    }

    override fun attachBaseContext(newBase: Context) {
        oldPrefLocaleCode = Storage(newBase).getPreferredLocale()
        applyOverrideConfiguration(LocaleUtil.getLocalizedConfiguration(oldPrefLocaleCode))
        super.attachBaseContext(newBase)
    }

    fun Context.close() {
        (this as BaseActivity).finish()
    }

    companion object {
        lateinit var role: Role
        lateinit var scaffoldState: ScaffoldState
    }
}