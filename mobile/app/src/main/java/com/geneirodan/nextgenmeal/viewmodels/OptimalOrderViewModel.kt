package com.geneirodan.nextgenmeal.viewmodels

import androidx.compose.material.ScaffoldState
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.geneirodan.nextgenmeal.NextGenMealApp
import com.geneirodan.nextgenmeal.Api
import com.geneirodan.nextgenmeal.data.OrderDish
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.utils.InputType
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.launch

class OptimalOrderViewModel : ViewModel() {
    val types = mutableStateOf(emptyList<String>())
    val cateringId = mutableIntStateOf(0)
    val maxPrice = mutableStateOf(InputState(type = InputType.NUMBER))
    val fields = mutableStateMapOf<String, MutableState<InputState>>()

    init {
        viewModelScope.launch {
            val response = NextGenMealApp.client.get("Dish/Types")
            types.value = if (response.status == HttpStatusCode.OK)
                response.body()
            else emptyList()
        }
    }

    fun confirmOptimal(
        newOrderViewModel: NewOrderViewModel,
        scaffoldState: ScaffoldState
    ) {
        newOrderViewModel.viewModelScope.launch {
            val response = NextGenMealApp.client.get("Order/Optimal") {
                url {
                    parameters.append("maxPrice", maxPrice.value.text)
                    parameters.append("cateringId", cateringId.intValue.toString())
                    fields.forEach { (name, state) ->
                        parameters.append(name, state.value.text)
                    }
                }
            }
            if (response.status == HttpStatusCode.OK) {
                newOrderViewModel.items.clear()
                response.body<List<OrderDish>>().forEach { newOrderViewModel.items[it.dishId] = it }
                if (newOrderViewModel.items.values.isNotEmpty()) newOrderViewModel.nextStep()
            } else Api.handleError(response, scaffoldState)
        }
    }
}