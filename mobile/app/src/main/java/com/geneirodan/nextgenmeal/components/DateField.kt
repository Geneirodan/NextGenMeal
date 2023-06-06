package com.geneirodan.nextgenmeal.components

import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import com.geneirodan.nextgenmeal.utils.DateTimeFormatter.Companion.formatDate
import com.vanpra.composematerialdialogs.MaterialDialog
import com.vanpra.composematerialdialogs.datetime.date.datepicker
import com.vanpra.composematerialdialogs.rememberMaterialDialogState
import java.time.LocalDate

@Composable
fun DateField(
    localDate: MutableState<LocalDate?>,
    modifier: Modifier,
    allowedDateValidator: (LocalDate) -> Boolean = { true },
    label: @Composable (() -> Unit)?,
    onValueChange: (LocalDate) -> Unit
) {
    val context = LocalContext.current
    val formattedDateTime by remember {
        derivedStateOf { localDate.value?.let { formatDate(it, context) } }
    }
    val dialogState = rememberMaterialDialogState()

    MaterialDialog(dialogState = dialogState, buttons = {
        positiveButton("OK")
    }) {
        datepicker(
            initialDate = LocalDate.now(),
            allowedDateValidator = allowedDateValidator,
            onDateChange = onValueChange
        )
    }
    OutlinedTextField(
        label = label,
        modifier = modifier,
        value = if (formattedDateTime != null) formattedDateTime!! else "",
        onValueChange = {},
        trailingIcon = {
            IconButton(onClick = { dialogState.show() }) {
                Icon(Icons.Default.CalendarToday, "")
            }
        },
        readOnly = true
    )
}

