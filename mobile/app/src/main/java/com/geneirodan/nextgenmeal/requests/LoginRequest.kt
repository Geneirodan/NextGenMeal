package com.geneirodan.nextgenmeal.requests

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest (val email: String, val password: String)
@Serializable
data class ProviderRequest (val providerKey: String?, val token: String?)