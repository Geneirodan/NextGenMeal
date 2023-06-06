package com.geneirodan.nextgenmeal.data

import androidx.annotation.Keep
import kotlinx.serialization.Serializable

@Serializable
@Keep
data class Catering(
    val id: Int,
    val name: String,
    val street: String,
    val city: String,
    val state: String,
    val serviceId: String,
    val terminal: Terminal?
)