package com.geneirodan.nextgenmeal.fragments

import android.content.Context
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarToday
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.components.CustomInputField
import com.geneirodan.nextgenmeal.components.OrderCard
import com.geneirodan.nextgenmeal.components.format
import com.geneirodan.nextgenmeal.viewmodels.OrderListViewModel
import com.geneirodan.nextgenmeal.viewmodels.OrderListViewModel.Companion.ITEMS_PER_PAGE
import com.vanpra.composematerialdialogs.MaterialDialog
import com.vanpra.composematerialdialogs.datetime.date.datepicker
import com.vanpra.composematerialdialogs.rememberMaterialDialogState
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import java.time.LocalDate

@Preview
@Composable
fun Orders(viewModel: OrderListViewModel = viewModel()) {
    val context = LocalContext.current
    val startTime = viewModel.startTime
    val endTime = viewModel.endTime
    val orders = viewModel.orders.value
    val loading = viewModel.loading.value
    val page = viewModel.page.intValue
    Column(
        modifier = Modifier.padding(10.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        DateField(startTime, context)
        DateField(endTime, context)
        LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
            itemsIndexed(items = orders) { index, order ->
                viewModel.onChangeScrollPosition(index)
                if((index + 1) >= (page * ITEMS_PER_PAGE) && !loading){
                    viewModel.nextPage()
                }
                OrderCard(order = order)
            }
        }
        if (loading) CircularProgressIndicator()
    }
}

@Composable
private fun DateField(
    dateTime: MutableState<LocalDateTime?>,
    context: Context
) {
    val formattedDateTime by remember {
        derivedStateOf { dateTime.value?.let { format(it.toJavaLocalDateTime(), context) } }
    }
    val startDateDialogState = rememberMaterialDialogState()

    MaterialDialog(dialogState = startDateDialogState) {
        datepicker(initialDate = LocalDate.now(), allowedDateValidator = {
            it.isAfter(LocalDate.now())
        }) {
            dateTime.value = it.atStartOfDay().toKotlinLocalDateTime()
        }
    }
    CustomInputField(
        modifier = Modifier.fillMaxWidth(),
        value = if (formattedDateTime != null) formattedDateTime!! else "",
        onValueChange = {},
        onFocusChange = {},
        trailingIcon = {
            IconButton(onClick = { startDateDialogState.show() }) {
                Icon(Icons.Default.CalendarToday, "")
            }
        }
    )
}