package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
data class OrderDish(
    val quantity: Int,
    val dishId: Int,
    val dish: Dish,
    val orderId: Int
)