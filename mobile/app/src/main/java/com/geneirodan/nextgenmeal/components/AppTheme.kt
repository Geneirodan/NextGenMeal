package com.geneirodan.nextgenmeal.components

import androidx.compose.material.MaterialTheme
import androidx.compose.material.Typography
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.sp

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        typography = Typography(
            body1 = TextStyle(fontSize = 16.sp),
            button = TextStyle(fontSize = 16.sp)
        ),
        content = content
    )
}