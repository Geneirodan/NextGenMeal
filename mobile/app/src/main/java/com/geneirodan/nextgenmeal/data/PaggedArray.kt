package com.geneirodan.nextgenmeal.data

import kotlinx.serialization.Serializable

@Serializable
data class PaggedArray<T>(val items: List<T>, val totalCount: Int)