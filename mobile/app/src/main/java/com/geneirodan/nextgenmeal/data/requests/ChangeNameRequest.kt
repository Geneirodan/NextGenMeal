package com.geneirodan.nextgenmeal.data.requests

import kotlinx.serialization.Serializable

@Serializable
data class ChangeNameRequest(val name: String)