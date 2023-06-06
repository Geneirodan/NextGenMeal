package com.geneirodan.nextgenmeal.data.requests

import kotlinx.serialization.Serializable

@Serializable
data class RegisterRequest (val name: String, val email: String, val password: String, val confirmPassword: String)