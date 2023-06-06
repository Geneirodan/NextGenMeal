package com.geneirodan.nextgenmeal.viewmodels.abstractions

import android.content.Context
import androidx.compose.runtime.MutableState
import androidx.lifecycle.ViewModel
import com.geneirodan.nextgenmeal.utils.InputState

abstract class FormViewModel : ViewModel() {
    abstract val fields: List<MutableState<InputState>>

    fun validate(): Boolean = fields.all { it.value.isValid }

    companion object{
        fun MutableState<InputState>.onChange(newValue: String) = apply{
            value = value.copy(text = newValue)
        }

        fun MutableState<InputState>.onFocusChange(context: Context) = apply {
            val (isValid, errorMessage) = value.type.validate(value.text, context)
            value = value.copy(isValid = isValid, errorMessage = errorMessage)
        }
    }

    fun onFocusChanged(context: Context) {
        fields.forEach {
            it.onFocusChange(context)
        }
    }
}