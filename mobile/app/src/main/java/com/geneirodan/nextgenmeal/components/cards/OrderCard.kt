package com.geneirodan.nextgenmeal.components.cards

import android.icu.text.NumberFormat
import androidx.activity.compose.ManagedActivityResultLauncher
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.Card
import androidx.compose.material.Chip
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Inventory2
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.data.Order
import com.geneirodan.nextgenmeal.utils.DateTimeFormatter.Companion.formatDateTime
import kotlinx.datetime.toJavaLocalDateTime

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun OrderCard(order: Order, resultLauncher: ManagedActivityResultLauncher<Order, Boolean>) {
    val price = NumberFormat.getInstance().format(order.price)
    val time = formatDateTime(order.time.toJavaLocalDateTime(), LocalContext.current)
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable {
                resultLauncher.launch(order)
            },
        elevation = 3.dp
    ) {
        Column(
            modifier = Modifier.padding(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(text = "${stringResource(R.string.order)}: №${order.id} ")
                        if (order.isBox)
                            Icon(
                                Icons.Outlined.Inventory2,
                                "",
                                modifier = Modifier.size(16.dp),
                                tint = MaterialTheme.colors.primary
                            )
                    }
                    Text(text = "${stringResource(R.string.time)}: $time")
                    Text(text = "${stringResource(R.string.price)}: $$price")
                }
                Chip(onClick = {}) {
                    Text(order.status)
                }
            }
        }

    }
}