package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
data class Terminal(
    val id: Int,
    val serialNumber: String,
    val cells: List<String>,
    val cellCount: Int
)