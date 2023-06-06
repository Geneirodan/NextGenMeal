package com.geneirodan.nextgenmeal.data.requests

import kotlinx.serialization.Serializable

@Serializable
data class ProviderRequest (val providerKey: String?, val token: String?)