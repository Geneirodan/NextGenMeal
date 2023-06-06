package com.geneirodan.nextgenmeal.viewmodels

import android.content.Context
import androidx.activity.compose.BackHandler
import androidx.compose.material.ScaffoldState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavHostController
import com.geneirodan.nextgenmeal.activities.BaseActivity
import com.geneirodan.nextgenmeal.Api
import com.geneirodan.nextgenmeal.data.OrderDish
import com.geneirodan.nextgenmeal.data.requests.OrderDishRequest
import com.geneirodan.nextgenmeal.data.requests.OrderRequest
import com.xsims.stepper_compose.StepState
import com.xsims.stepper_compose.StepState.COMPLETE
import com.xsims.stepper_compose.StepState.TODO
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.launch
import kotlinx.datetime.toKotlinLocalDateTime
import java.time.LocalDate
import java.time.LocalTime

class NewOrderViewModel : ViewModel() {
    val date = mutableStateOf<LocalDate?>(null)
    val time = mutableStateOf<LocalTime?>(null)
    val cateringId = mutableIntStateOf(0)
    val isBox = mutableStateOf(false)
    val serviceId = mutableStateOf("")
    val stepStates = mutableListOf(
        mutableStateOf(TODO),
        mutableStateOf(TODO),
        mutableStateOf(TODO),
        mutableStateOf(TODO)
    )
    val items = mutableStateMapOf<Int, OrderDish>()
    val currentStep = mutableIntStateOf(0)


    fun reset() {
        currentStep.intValue = 0
        stepStates.replaceAll { mutableStateOf(TODO) }
        date.value = null
        time.value = null
        isBox.value = false
        serviceId.value = ""
        items.clear()
    }

    @Composable
    fun HandleBack() {
        BackHandler(true) {
            currentStep.intValue = currentStep.intValue - 1
            stepStates[currentStep.intValue].value = TODO
        }
    }

    fun nextStep() {
        stepStates[currentStep.intValue].value = COMPLETE
        currentStep.intValue = currentStep.intValue + 1
    }

    fun createOrder(
        context: Context,
        navController: NavHostController,
        scaffoldState: ScaffoldState
    ) {
        viewModelScope.launch {
            stepStates[3].value = StepState.COMPLETE
            val order = OrderRequest(
                date.value!!.atTime(time.value).toKotlinLocalDateTime(),
                isBox.value,
                cateringId.intValue,
                items.values.map { OrderDishRequest(it.quantity, it.dishId) })
            val response = Api.post("Order", body = order)
            if (response.status == HttpStatusCode.Created) {
                (context as BaseActivity).recreate()
                reset()
                navController.navigate("orders")
            } else Api.handleError(response, scaffoldState)
        }
    }
    fun getPrice() = items.values.fold(0.0) { x, y -> x + y.dish.price * y.quantity }
}

