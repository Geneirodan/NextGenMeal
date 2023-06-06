package com.geneirodan.nextgenmeal.data.requests

import kotlinx.serialization.Serializable

@Serializable
data class OrderDishRequest(val quantity: Int, val dishId: Int)