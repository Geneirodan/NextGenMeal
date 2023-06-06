package com.geneirodan.nextgenmeal.data

import androidx.annotation.Keep
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Order(
    val id: Int,
    val price: Double,
    val status: String,
    val time: LocalDateTime,
    val isBox: Boolean,
    val customerId: String?,
    val cateringId: Int,
    val orderDishes: List<OrderDish>,
    val catering: Catering
)

