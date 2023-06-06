package com.geneirodan.nextgenmeal.data

import androidx.annotation.Keep
import kotlinx.serialization.Serializable

@Serializable
@Keep
data class Dish(
    val id: Int,
    val price: Double,
    val portion: Double,
    val name: String,
    val description: String,
    val type: String,
    val cateringId: Int
)