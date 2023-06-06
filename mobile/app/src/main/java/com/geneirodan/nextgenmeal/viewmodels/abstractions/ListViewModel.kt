package com.geneirodan.nextgenmeal.viewmodels.abstractions

import android.util.Log
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.geneirodan.nextgenmeal.activities.BaseActivity.Companion.role
import com.geneirodan.nextgenmeal.utils.Role
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString


abstract class ListViewModel<T> : ViewModel() {
    companion object {
        const val ITEMS_PER_PAGE = 10
    }

    val items = mutableStateOf(emptyList<T>())
    val loading = mutableStateOf(false)
    private val page = mutableIntStateOf(1)
    val params = mutableStateMapOf<String, String?>()
    private var scrollPosition = 0

    init {
        if(role == Role.EMPLOYEE) {
            params["isBox"] = "true"
            params["status"] = "Undone"
        }
        newLoad()
    }

    fun setParam(name: String, value: String?) {
        if (params[name] != value) {
            params[name] = value
            newLoad()
        }
    }

    fun newLoad() {
        viewModelScope.launch {
            loading.value = true
            val defParams = params
            defParams["page"] = "1"
            Log.d("D", Json.encodeToString(defParams.toMap()))
            items.value = get(defParams)
            loading.value = false
        }
    }

    private fun nextPage() {
        viewModelScope.launch {
            if ((scrollPosition + 1) >= (page.intValue * ITEMS_PER_PAGE)) {
                loading.value = true
                incrementPage()
                if (page.intValue > 0) {
                    append(get(params))
                }
                loading.value = false
            }
        }
    }

    private fun incrementPage() {
        page.intValue = page.intValue + 1
        params["page"] = page.intValue.toString()
    }

    abstract suspend fun get(params: Map<String, String?>): List<T>

    private fun append(orders: List<T>) {
        val current = ArrayList(this.items.value)
        current.addAll(orders)
        this.items.value = current
    }

    fun onChangeScrollPosition(index: Int) {
        scrollPosition = index
        if ((index + 1) >= (page.intValue * ITEMS_PER_PAGE) && !loading.value)
            nextPage()

    }
}