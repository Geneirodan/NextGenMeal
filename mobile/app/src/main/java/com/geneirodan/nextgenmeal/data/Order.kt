package com.geneirodan.nextgenmeal.data

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Order(
    val price: Double,
    val status: String,
    val time: LocalDateTime,
    val isBox: Boolean,
    val userId: String,
    val cateringId: Int,
    val orderDishes: List<OrderDish>,
)