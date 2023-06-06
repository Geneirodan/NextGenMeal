package com.geneirodan.nextgenmeal.data

import androidx.annotation.Keep
import kotlinx.serialization.Serializable

@Serializable
@Keep
data class OrderDish(
    val quantity: Int,
    val dishId: Int,
    val dish: Dish,
    val orderId: Int
)