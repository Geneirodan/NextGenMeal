package com.geneirodan.nextgenmeal.components

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.LocalTextStyle
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.material.TextFieldColors
import androidx.compose.material.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.viewmodels.abstractions.FormViewModel.Companion.onChange
import com.geneirodan.nextgenmeal.viewmodels.abstractions.FormViewModel.Companion.onFocusChange

@Composable
fun CustomInputField(
    value: MutableState<InputState>,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    textStyle: TextStyle = LocalTextStyle.current,
    label: @Composable (() -> Unit)? = null,
    placeholder: @Composable (() -> Unit)? = null,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    visualTransformation: VisualTransformation = VisualTransformation.None,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    keyboardActions: KeyboardActions = KeyboardActions(),
    singleLine: Boolean = false,
    maxLines: Int = Int.MAX_VALUE,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    shape: Shape = MaterialTheme.shapes.small,
    colors: TextFieldColors = TextFieldDefaults.outlinedTextFieldColors(),
) {
    var touched by remember { mutableStateOf(false) }
    val context = LocalContext.current
    Column {
        OutlinedTextField(
            value = value.value.text,
            placeholder = placeholder,
            enabled = enabled,
            readOnly = readOnly,
            textStyle = textStyle,
            label = label,
            leadingIcon = leadingIcon,
            trailingIcon = trailingIcon,
            isError = !value.value.isValid,
            visualTransformation = visualTransformation,
            keyboardOptions = keyboardOptions,
            keyboardActions = keyboardActions,
            singleLine = singleLine,
            maxLines = maxLines,
            interactionSource = interactionSource,
            shape = shape,
            colors = colors,
            onValueChange = {
                touched = true
                value.onChange(it)
            },
            modifier = modifier.onFocusChanged { if (touched) value.onFocusChange(context) },
        )
        if (!value.value.isValid && touched) {
            Text(
                text = value.value.errorMessage,
                color = Color.Red,
                modifier = Modifier.padding(start = 15.dp)
            )
        }
    }
}