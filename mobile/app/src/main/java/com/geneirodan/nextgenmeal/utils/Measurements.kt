package com.geneirodan.nextgenmeal.utils

import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.res.stringResource
import androidx.lifecycle.ViewModel
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.preferences
import com.geneirodan.nextgenmeal.R
import kotlin.math.round

class Measurements : ViewModel() {
    companion object {
        val units = listOf("gram", "ounce")
        private val ratios = mapOf(
            Pair(units[0], 1.0),
            Pair(units[1], 28.35)
        )
        private val unitSymbols = mapOf(
            Pair(units[0], R.string.gram_symbol),
            Pair(units[1], R.string.ounce_symbol)
        )
        val unitNames = mapOf(
            Pair(units[0], R.string.gram),
            Pair(units[1], R.string.ounce)
        )
        val selectedUnit = mutableStateOf(units[0])

        init {
            if (!preferences.contains("measurement"))
                preferences.edit().apply {
                    putString("measurement", units[0])
                    apply()
                }
            selectedUnit.value = preferences.getString("measurement", units[0])!!
        }

        fun onChange(value: String){
            selectedUnit.value = value
            preferences.edit().apply {
                putString("measurement", value)
                apply()
            }
        }
        @Composable
        fun m(value: Double) = selectedUnit.value.let {
            "${round(value * 100 / ratios[it]!!)/100} ${stringResource(unitSymbols[it]!!)}"
        }
    }
}