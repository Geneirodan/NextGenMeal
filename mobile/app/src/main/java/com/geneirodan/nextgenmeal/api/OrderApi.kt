package com.geneirodan.nextgenmeal.api

import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.data.Order
import com.geneirodan.nextgenmeal.data.PaggedArray
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.http.HttpStatusCode
import java.time.LocalDateTime

class OrderApi {
    companion object {
        suspend fun get(
            page: Int,
            startTime: LocalDateTime? = null,
            endTime: LocalDateTime? = null,
            isBox: Boolean? = null
        ): List<Order> {
            val response = client.get("Order") {
                url {
                    parameters.append("page", page.toString())
                    startTime?.apply { parameters.append("startTime", startTime.toString()) }
                    endTime?.apply { parameters.append("startTime", endTime.toString()) }
                    isBox?.apply { parameters.append("startTime", isBox.toString()) }
                }
            }
            return if (response.status == HttpStatusCode.OK)
                response.body<PaggedArray<Order>>().items
            else
                emptyList()
        }
    }
}