package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
open class User {
    var name: String = ""
    var email: String = ""
    var id: String = ""
}

