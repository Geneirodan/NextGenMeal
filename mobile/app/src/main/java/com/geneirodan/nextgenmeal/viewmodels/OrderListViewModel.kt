package com.geneirodan.nextgenmeal.viewmodels

import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.geneirodan.nextgenmeal.api.OrderApi
import com.geneirodan.nextgenmeal.data.Order
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDateTime


class OrderListViewModel : ViewModel() {
    companion object {
        const val ITEMS_PER_PAGE = 10
    }

    val orders = mutableStateOf(emptyList<Order>())
    val startTime = mutableStateOf<LocalDateTime?>(null)
    val endTime = mutableStateOf<LocalDateTime?>(null)
    val loading = mutableStateOf(false)
    val page = mutableIntStateOf(1)
    private var scrollPosition = 0

    init {
        load()
    }

    private fun load() {
        viewModelScope.launch {
            loading.value = true
            orders.value = OrderApi.get(1)
            loading.value = false
        }
    }

    fun nextPage() {
        viewModelScope.launch {
            if ((scrollPosition + 1) >= (page.intValue * ITEMS_PER_PAGE)) {
                loading.value = true
                page.intValue = page.intValue + 1
                if (page.intValue > 0) {
                    append(OrderApi.get(page.intValue))
                }
                loading.value = false
            }
        }
    }

    private fun append(orders: List<Order>) {
        val current = ArrayList(this.orders.value)
        current.addAll(orders)
        this.orders.value = current
    }

    fun onChangeScrollPosition(position: Int) {
        scrollPosition = position
    }
}