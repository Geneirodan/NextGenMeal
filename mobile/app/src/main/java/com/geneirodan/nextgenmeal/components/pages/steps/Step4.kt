package com.geneirodan.nextgenmeal.components.pages.steps

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.Switch
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.activities.BaseActivity.Companion.scaffoldState
import com.geneirodan.nextgenmeal.components.DateField
import com.geneirodan.nextgenmeal.components.TimeField
import com.geneirodan.nextgenmeal.components.cards.DishCard
import com.geneirodan.nextgenmeal.viewmodels.NewOrderViewModel
import com.xsims.stepper_compose.Step
import java.time.LocalDate

@Composable
fun NewOrderViewModel.step4(navController: NavHostController) =
    Step(title = stringResource(R.string.submit_order)) {
        val context = LocalContext.current
        var dialogOpen by remember { mutableStateOf(false) }
        HandleBack()
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(10.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Text("${stringResource(R.string.your_price)}: $${getPrice()}")
            DateField(localDate = date,
                modifier = Modifier.fillMaxWidth(),
                allowedDateValidator = { it.isAfter(LocalDate.now().plusDays(1)) },
                label = { Text(stringResource(R.string.choose_date)) }) {
                date.value = it
            }
            TimeField(modifier = Modifier.fillMaxWidth(),
                localTime = time,
                label = { Text(stringResource(R.string.choose_time)) }) {
                time.value = it
            }
            Row(verticalAlignment = Alignment.CenterVertically) {
                Switch(checked = isBox.value, onCheckedChange = { isBox.value = it })
                Text(stringResource(R.string.pack_in_box))
            }
            Button(onClick = { dialogOpen = true }, modifier = Modifier.fillMaxWidth()) {
                Text(stringResource(R.string.your_dishes))
            }
            if (dialogOpen) AlertDialog(onDismissRequest = { dialogOpen = false }, text = {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    itemsIndexed(items = items.values.toList()) { _, orderDish ->
                        DishCard(dish = orderDish.dish, quantity = orderDish.quantity)
                    }
                    item { Spacer(modifier = Modifier.height(10.dp)) }
                }
            }, buttons = {})
            Button(modifier = Modifier.fillMaxWidth(),
                enabled = date.value != null && time.value != null,
                onClick = {
                    createOrder(context, navController, scaffoldState)

                }) {
                Text(stringResource(R.string.finish))
            }
        }
    }



