package com.geneirodan.nextgenmeal.components

import androidx.compose.foundation.layout.Box
import androidx.compose.material.DropdownMenu
import androidx.compose.material.DropdownMenuItem
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Language
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalContext
import com.geneirodan.nextgenmeal.activities.BaseActivity
import com.geneirodan.nextgenmeal.utils.LocaleUtil
import com.geneirodan.nextgenmeal.utils.LocaleUtil.Companion.supportedLocales
import java.util.Locale


@Composable
fun LangDropDown() {
    val context = LocalContext.current as BaseActivity
    val open = remember { mutableStateOf(false) }
    Box {
        IconButton(onClick = { open.value = true }) {
            Icon(
                Icons.Default.Language, contentDescription = ""
            )
        }
        DropdownMenu(expanded = open.value, onDismissRequest = { open.value = false }) {
            for (lang in supportedLocales) DropdownMenuItem(onClick = {
                context.storage.setPreferredLocale(lang)
                LocaleUtil.applyLocalizedContext(context, lang)
                context.recreate()
            }) { Text(lang.uppercase(Locale.getDefault())) }
        }
    }
}