package com.geneirodan.nextgenmeal.components.pages.steps

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.Button
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.components.OptimalDialogButton
import com.geneirodan.nextgenmeal.components.Preloader
import com.geneirodan.nextgenmeal.components.SearchField
import com.geneirodan.nextgenmeal.components.cards.DishCard
import com.geneirodan.nextgenmeal.data.OrderDish
import com.geneirodan.nextgenmeal.viewmodels.DishesViewModel
import com.geneirodan.nextgenmeal.viewmodels.NewOrderViewModel
import com.xsims.stepper_compose.Step

@Composable
fun NewOrderViewModel.step3(dishesViewModel: DishesViewModel = viewModel()) =
    Step(title = stringResource(R.string.choose_dishes), state = stepStates[2]) {
        HandleBack()
        dishesViewModel.setParam("cateringId", cateringId.intValue.toString())
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(10.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            dishesViewModel.SearchField()
            LazyColumn(
                modifier = Modifier.height(300.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                itemsIndexed(items = dishesViewModel.items.value) { index, dish ->
                    dishesViewModel.onChangeScrollPosition(index)
                    var quantity by remember { mutableIntStateOf(0) }
                    DishCard(dish = dish, quantity = quantity, onAdd = {
                        quantity++
                        if (quantity > 0) items[dish.id] = OrderDish(quantity, dish.id, dish, 0)
                    }, onRemove = {
                        if (quantity > 0) quantity--
                        if (quantity == 0) items.remove(dish.id)
                    })
                }
            }
            if (dishesViewModel.loading.value) Preloader()
            this@step3.OptimalDialogButton()
            Button(modifier = Modifier.fillMaxWidth(), enabled = items.isNotEmpty(), onClick = {
                nextStep()
            }) {
                Text(stringResource(R.string.next))
            }
        }
    }

