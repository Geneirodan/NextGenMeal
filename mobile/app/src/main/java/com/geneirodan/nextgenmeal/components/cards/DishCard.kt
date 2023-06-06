package com.geneirodan.nextgenmeal.components.cards

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Card
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Remove
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.geneirodan.nextgenmeal.R.*
import com.geneirodan.nextgenmeal.components.AppTheme
import com.geneirodan.nextgenmeal.data.Dish
import com.geneirodan.nextgenmeal.utils.Measurements.Companion.m

@Composable
@Preview
fun DishCardPreview() {
    AppTheme {
        DishCard(
            dish = Dish(0, 12.34, 14.24, "Name", "Desc", "Type", 1),
            quantity = 2,
            onAdd = {},
            onRemove = {})

    }
}

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun DishCard(
    dish: Dish,
    quantity: Int,
    onAdd: (() -> Unit)? = null,
    onRemove: (() -> Unit)? = null
) {
    Card(elevation = 3.dp) {
        dish.apply {
            Row(
                modifier = Modifier
                    .padding(10.dp)
                    .fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth()
                ) {
                    Text(text = "${stringResource(string.name)}: $name")
                    Text(text = "${stringResource(string.price)}: $$price")
                    Text(text = "${stringResource(string.portion)}: ${m(portion)}")
                    Text(text = "${stringResource(string.type)}: $type")
                    Text(text = description, softWrap = true)
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    onRemove?.let {
                        IconButton(onClick = it) {
                            Icon(Icons.Default.Remove, "")
                        }
                    }
                    Text(quantity.toString())
                    onAdd?.let {
                        IconButton(onClick = it) {
                            Icon(Icons.Default.Add, "")
                        }
                    }
                }
            }
        }
    }
}