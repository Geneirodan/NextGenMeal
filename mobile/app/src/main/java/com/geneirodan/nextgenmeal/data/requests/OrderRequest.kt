package com.geneirodan.nextgenmeal.data.requests

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class OrderRequest(
    val time: LocalDateTime,
    val isBox: Boolean,
    val cateringId: Int,
    val orderDishes: List<OrderDishRequest>
)

