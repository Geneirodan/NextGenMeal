package com.geneirodan.nextgenmeal.components

import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import com.geneirodan.nextgenmeal.utils.DateTimeFormatter.Companion.formatTime
import com.vanpra.composematerialdialogs.MaterialDialog
import com.vanpra.composematerialdialogs.datetime.time.timepicker
import com.vanpra.composematerialdialogs.rememberMaterialDialogState
import java.time.LocalTime

@Composable
fun TimeField(
    localTime: MutableState<LocalTime?>,
    modifier: Modifier,
    label: @Composable (() -> Unit)?,
    onValueChange: (LocalTime) -> Unit
) {
    val context = LocalContext.current
    val formattedTime by remember {
        derivedStateOf { localTime.value?.let { formatTime(it, context) } }
    }
    val dialogState = rememberMaterialDialogState()

    MaterialDialog(dialogState = dialogState, buttons = {
        positiveButton("OK")
    }) {
        timepicker(
            initialTime = LocalTime.NOON,
            onTimeChange = onValueChange
        )
    }
    OutlinedTextField(
        label = label,
        modifier = modifier,
        value = if (formattedTime != null) formattedTime!! else "",
        onValueChange = {},
        trailingIcon = {
            IconButton(onClick = { dialogState.show() }) {
                Icon(Icons.Default.Schedule, "")
            }
        },
        readOnly = true
    )
}