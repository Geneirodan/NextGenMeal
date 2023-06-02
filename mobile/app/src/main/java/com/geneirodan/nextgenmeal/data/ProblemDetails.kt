package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
data class ProblemDetails(
    val traceId: String? = null,
    val type: String? = null,
    val title: String? = null,
    val status: Int? = null,
    val errors: Map<String, List<String>>? = null
)