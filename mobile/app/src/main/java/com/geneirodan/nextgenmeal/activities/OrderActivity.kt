@file:OptIn(ExperimentalMaterialApi::class)

package com.geneirodan.nextgenmeal.activities

import android.app.Activity
import android.icu.text.NumberFormat
import android.os.Bundle
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.Card
import androidx.compose.material.Chip
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.outlined.Inventory2
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.Api
import com.geneirodan.nextgenmeal.components.LangDropDown
import com.geneirodan.nextgenmeal.components.cards.DishCard
import com.geneirodan.nextgenmeal.data.Order
import com.geneirodan.nextgenmeal.components.AppTheme
import com.geneirodan.nextgenmeal.utils.DateTimeFormatter.Companion.formatDateTime
import com.geneirodan.nextgenmeal.utils.Role
import io.ktor.client.request.patch
import io.ktor.http.HttpStatusCode
import kotlinx.coroutines.launch
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

class OrderActivity : BaseActivity() {

    @OptIn(ExperimentalMaterialApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val orderExtra = intent.getStringExtra("Order")?.let<String, Order> {
            Json.decodeFromString(it)
        }
        val order = mutableStateOf(orderExtra!!)
        setContent {
            AppTheme {
                val coroutineScope = rememberCoroutineScope()
                BackHandler { finish() }
                Scaffold(
                    scaffoldState = rememberScaffoldState(),
                    topBar = {
                        TopAppBar {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween
                            ) {
                                Button(
                                    onClick = { close() },
                                    colors = ButtonDefaults.buttonColors(
                                        backgroundColor = Color.Transparent
                                    ),
                                    elevation = ButtonDefaults.elevation(0.dp)
                                ) {
                                    Icon(Icons.Default.ArrowBack, "")
                                    Text("Back")
                                }
                                LangDropDown()
                            }
                        }
                    }
                ) {
                    val price = NumberFormat.getInstance().format(order.value.price)
                    val time =
                        formatDateTime(order.value.time.toJavaLocalDateTime(), LocalContext.current)
                    Column(
                        verticalArrangement = Arrangement.spacedBy(10.dp),
                        modifier = Modifier
                            .padding(it)
                            .padding(20.dp)
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(text = "${stringResource(R.string.order)}: №${order.value.id} ")
                                    if (order.value.isBox)
                                        Icon(
                                            Icons.Outlined.Inventory2,
                                            "",
                                            modifier = Modifier.size(16.dp),
                                            tint = MaterialTheme.colors.primary
                                        )
                                }
                                Text("${stringResource(R.string.time)}: $time")
                                Text("${stringResource(R.string.price)}: $$price")
                            }
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Chip(onClick = {}) {
                                    Text(order.value.status)
                                }
                            }
                        }
                        Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("${stringResource(R.string.your_dishes)}:")
                            LazyColumn(
                                verticalArrangement = Arrangement.spacedBy(10.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                itemsIndexed(items = order.value.orderDishes) { _, (quantity, _, dish) ->
                                    Card(elevation = 3.dp) {
                                        DishCard(dish = dish, quantity = quantity)
                                    }
                                }
                            }
                            when (order.value.status) {
                                "Done" -> {
                                    if (role == Role.CUSTOMER && order.value.isBox)
                                        Button(modifier = Modifier.fillMaxWidth(), onClick = {
                                            coroutineScope.launch {
                                                receiveOrder(order)
                                            }
                                        }) {
                                            Text("Receive")
                                        }
                                }

                                "Undone" -> {
                                    if (role == Role.EMPLOYEE)
                                        Button(modifier = Modifier.fillMaxWidth(), onClick = {
                                            coroutineScope.launch {
                                                doOrder(order)
                                            }
                                        }) {
                                            Text("Done")
                                        }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private suspend fun doOrder(order: MutableState<Order>) =
        setStatus("Order/Do", order, "Done")

    private suspend fun receiveOrder(
        order: MutableState<Order>
    ) = setStatus("Order/Receive", order, "Received")

    private suspend fun BaseActivity.setStatus(
        urlString: String,
        order: MutableState<Order>,
        status: String
    ) {
        val response = client.patch(urlString) {
            url {
                parameters.append("id", order.value.id.toString())
            }
        }
        if (response.status == HttpStatusCode.OK) {
            order.value = order.value.copy(status = status)
            setResult(Activity.RESULT_OK)
        } else Api.handleError(response, scaffoldState)
    }
}