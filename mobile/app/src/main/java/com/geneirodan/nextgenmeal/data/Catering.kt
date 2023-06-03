package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
data class Catering(
    val name: String,
    val street: String,
    val city: String,
    val state: String,
    val serviceId: String,
    val terminal: Terminal
)