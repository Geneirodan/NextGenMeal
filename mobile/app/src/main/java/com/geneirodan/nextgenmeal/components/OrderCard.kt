package com.geneirodan.nextgenmeal.components

import android.content.Context
import android.icu.text.NumberFormat
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.expandVertically
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.shrinkVertically
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Card
import androidx.compose.material.Chip
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.outlined.Inventory2
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.data.Dish
import com.geneirodan.nextgenmeal.data.Order
import com.geneirodan.nextgenmeal.data.OrderDish
import kotlinx.datetime.toJavaLocalDateTime
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Composable
@Preview
fun SampleOrderCart() {
    OrderCard(
        order = Order(
            1,
            123.45,
            "status",
            kotlinx.datetime.LocalDateTime(1, 1, 1, 13, 1, 1, 1),
            true,
            "",
            0,
            listOf(
                OrderDish(1, 1, Dish(1, 25.0, 14.0, "Name", "Desc", "type", 1), 1),
                OrderDish(1, 1, Dish(1, 25.0, 14.0, "Name", "Desc", "type", 1), 1),
                OrderDish(1, 1, Dish(1, 25.0, 14.0, "Name", "Desc", "type", 1), 1),
            )
        )
    )
}

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun OrderCard(order: Order) {
    val price = NumberFormat.getInstance().format(order.price)
    val time = format(order.time.toJavaLocalDateTime(), LocalContext.current)
    var isExpanded: Boolean by remember { mutableStateOf(false) }

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { isExpanded = !isExpanded },
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
                        Text(text = "${stringResource(R.string.order)}: №${order.id}")
                        if (order.isBox)
                            Icon(
                                Icons.Outlined.Inventory2,
                                "",
                                tint = MaterialTheme.colors.primary
                            )
                    }
                    Text(text = "${stringResource(R.string.time)}: $time")
                    Text(text = "${stringResource(R.string.price)}: $$price")
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Chip(onClick = {}) {
                        Text(order.status)
                    }
                    Icon(
                        imageVector = if (isExpanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                        contentDescription = ""
                    )
                }
            }
            CardDetails(isExpanded) {
                order.orderDishes.forEach { (quantity, _, dish) ->
                    Card(elevation = 3.dp) {
                        with(dish) {
                            Row(
                                modifier = Modifier.padding(10.dp).fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column {
                                    Text(text = "${stringResource(R.string.name)}: $name")
                                    Text(text = "${stringResource(R.string.price)}: $$price")
                                    Text(text = "${stringResource(R.string.portion)}: $$portion")
                                    Text(text = "${stringResource(R.string.type)}: $$type")
                                    Text(text = description)
                                }
                                Chip(onClick = {}) {
                                    Text(quantity.toString())
                                }
                            }
                        }
                    }
                }
            }
        }

    }
}

fun format(time: LocalDateTime, context: Context): String? =
    DateTimeFormatter.ofPattern(context.getString(R.string.date_format))
        .format(time)


@Composable
fun CardDetails(
    isExpanded: Boolean,
    content: @Composable (ColumnScope.() -> Unit)
) {
    val expandTransition = remember {
        expandVertically(
            expandFrom = Alignment.Top,
            animationSpec = tween(300)
        ) + fadeIn(
            animationSpec = tween(300)
        )
    }

    // Closing Animation
    val collapseTransition = remember {
        shrinkVertically(
            shrinkTowards = Alignment.Top,
            animationSpec = tween(300)
        ) + fadeOut(
            animationSpec = tween(300)
        )
    }
    AnimatedVisibility(
        visible = isExpanded,
        enter = expandTransition,
        exit = collapseTransition
    ) { Column(
        verticalArrangement = Arrangement.spacedBy(10.dp), content = content) }
}