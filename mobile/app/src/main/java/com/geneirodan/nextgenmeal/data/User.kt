package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
open class User {
    var name: String = ""
    var email: String = ""
    var id: String = ""
    fun copy(name: String? = null,email: String? = null,id: String? = null,): User{
        val user = User()
        user.email = email ?: this.email
        user.name = name ?: this.name
        user.id = id ?: this.id
        return user
    }
}

