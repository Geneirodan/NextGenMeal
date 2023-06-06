package com.geneirodan.nextgenmeal.components.pages

import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.components.DateField
import com.geneirodan.nextgenmeal.components.Preloader
import com.geneirodan.nextgenmeal.components.cards.OrderCard
import com.geneirodan.nextgenmeal.utils.OrderContract
import com.geneirodan.nextgenmeal.viewmodels.OrderListViewModel

@Preview
@Composable
fun OrdersPage(viewModel: OrderListViewModel = viewModel()) {
    val startTime = viewModel.startTime
    val endTime = viewModel.endTime
    val loading = viewModel.loading.value
    val resultLauncher = rememberLauncherForActivityResult(contract = OrderContract()){
        if(it)
            viewModel.newLoad()
    }
    Column(
        modifier = Modifier.padding(10.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        DateField(
            localDate = startTime,
            modifier = Modifier.fillMaxWidth(),
            label = {Text(stringResource(R.string.choose_start_date))}
        ){
            startTime.value = it
            viewModel.onStartTimeChange(startTime.value)
        }
        DateField(
            localDate = endTime,
            modifier = Modifier.fillMaxWidth(),
            label = {Text(stringResource(R.string.choose_end_date))}
        ){
            endTime.value = it
            viewModel.onEndTimeChange(endTime.value)
        }
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            itemsIndexed(items = viewModel.items.value) { index, order ->
                viewModel.onChangeScrollPosition(index)
                OrderCard(order = order, resultLauncher = resultLauncher)
            }
        }
        if (loading) Preloader()
    }
}

