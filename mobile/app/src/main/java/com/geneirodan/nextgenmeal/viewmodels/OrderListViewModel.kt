package com.geneirodan.nextgenmeal.viewmodels

import androidx.compose.runtime.mutableStateOf
import com.geneirodan.nextgenmeal.Api.Companion.get
import com.geneirodan.nextgenmeal.data.Order
import com.geneirodan.nextgenmeal.viewmodels.abstractions.ListViewModel
import kotlinx.datetime.toKotlinLocalDateTime
import java.time.LocalDate

class OrderListViewModel : ListViewModel<Order>() {
    val startTime = mutableStateOf<LocalDate?>(null)
    val endTime = mutableStateOf<LocalDate?>(null)
    fun onStartTimeChange(startTime: LocalDate?) {
        params["startTime"] = startTime?.atStartOfDay()?.toKotlinLocalDateTime().toString()
        newLoad()
    }

    fun onEndTimeChange(endTime: LocalDate?) {
        params["endTime"] = endTime?.atStartOfDay()?.toKotlinLocalDateTime().toString()
        newLoad()
    }

    override suspend fun get(params: Map<String, String?>): List<Order> = get("Order", params)
}