package com.geneirodan.nextgenmeal.data

import androidx.annotation.Keep
import kotlinx.serialization.Serializable

@Serializable
@Keep
data class Terminal(
    val id: Int,
    val serialNumber: String,
    val cells: List<String>,
    val cellCount: Int
)