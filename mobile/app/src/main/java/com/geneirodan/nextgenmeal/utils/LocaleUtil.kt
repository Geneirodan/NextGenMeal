package com.geneirodan.nextgenmeal.utils

import android.content.Context
import android.content.res.Configuration
import android.content.res.Resources
import android.os.LocaleList
import androidx.core.os.ConfigurationCompat
import java.util.*


class LocaleUtil {
    companion object {
        val supportedLocales = listOf("en", "uk")
        const val OPTION_PHONE_LANGUAGE = "sys_def"

        private fun getLocaleFromPrefCode(prefCode: String): Locale {
            val localeCode = if (prefCode != OPTION_PHONE_LANGUAGE)
                prefCode
            else {
                val systemLang = ConfigurationCompat
                    .getLocales(Resources.getSystem().configuration)
                    .get(0)?.language
                if (systemLang in supportedLocales) systemLang
                else supportedLocales[0]
            }
            return Locale(localeCode!!)
        }

        fun getLocalizedConfiguration(prefLocaleCode: String): Configuration =
            getLocalizedConfiguration(getLocaleFromPrefCode(prefLocaleCode))

        private fun getLocalizedConfiguration(locale: Locale): Configuration {
            val config = Configuration()
            return config.apply {
                config.setLayoutDirection(locale)
                config.setLocale(locale)
                val localeList = LocaleList(locale)
                LocaleList.setDefault(localeList)
                config.setLocales(localeList)
            }
        }

        fun getLocalizedContext(baseContext: Context, prefLocaleCode: String): Context {
            val currentLocale = getLocaleFromPrefCode(prefLocaleCode)
            val baseLocale = getLocaleFromConfiguration(baseContext.resources.configuration)
            Locale.setDefault(currentLocale)
            return if (!baseLocale.toString().equals(currentLocale.toString(), ignoreCase = true)) {
                baseContext.createConfigurationContext(getLocalizedConfiguration(currentLocale))
                baseContext
            } else baseContext
        }

        fun applyLocalizedContext(baseContext: Context, prefLocaleCode: String) {
            val currentLocale = getLocaleFromPrefCode(prefLocaleCode)
            val baseLocale = getLocaleFromConfiguration(baseContext.resources.configuration)
            Locale.setDefault(currentLocale)
            if (!baseLocale.toString().equals(currentLocale.toString(), ignoreCase = true)) {
                val config = getLocalizedConfiguration(currentLocale)
                baseContext.createConfigurationContext(config)
            }
        }

        private fun getLocaleFromConfiguration(configuration: Configuration): Locale =
            configuration.locales.get(0)
    }
}