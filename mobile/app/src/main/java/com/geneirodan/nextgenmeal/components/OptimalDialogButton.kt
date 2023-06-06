package com.geneirodan.nextgenmeal.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.Chip
import androidx.compose.material.ChipDefaults
import androidx.compose.material.DropdownMenuItem
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ExposedDropdownMenuBox
import androidx.compose.material.ExposedDropdownMenuDefaults
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.DialogProperties
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.activities.BaseActivity.Companion.scaffoldState
import com.geneirodan.nextgenmeal.utils.InputState
import com.geneirodan.nextgenmeal.utils.InputType
import com.geneirodan.nextgenmeal.viewmodels.NewOrderViewModel
import com.geneirodan.nextgenmeal.viewmodels.OptimalOrderViewModel
import kotlin.collections.component1
import kotlin.collections.component2
import kotlin.collections.contains
import kotlin.collections.forEach
import kotlin.collections.set

@Composable
@OptIn(ExperimentalMaterialApi::class, ExperimentalLayoutApi::class)
fun NewOrderViewModel.OptimalDialogButton(optimalOrderViewModel: OptimalOrderViewModel = viewModel()) {
    var dialogOpen by remember { mutableStateOf(false) }
    var expanded by remember { mutableStateOf(false) }
    optimalOrderViewModel.cateringId.intValue = cateringId.intValue
    Button(modifier = Modifier.fillMaxWidth(), onClick = { dialogOpen = true }) {
        Text(stringResource(R.string.try_optimal))
    }
    if (dialogOpen) AlertDialog(
        modifier = Modifier
            .wrapContentSize()
            .padding(20.dp),
        properties = DialogProperties(usePlatformDefaultWidth = false),
        onDismissRequest = { dialogOpen = false },
        title = { Text("Optimal") },
        text = {
            Column {
                ExposedDropdownMenuBox(modifier = Modifier.fillMaxWidth(),
                    expanded = expanded,
                    onExpandedChange = { expanded = !expanded }) {
                    Surface(
                        modifier = Modifier.fillMaxWidth(),
                        onClick = { expanded = !expanded },
                        border = BorderStroke(1.dp, MaterialTheme.colors.primary),
                        shape = MaterialTheme.shapes.small
                    ) {
                        Row(horizontalArrangement = Arrangement.SpaceBetween) {
                            FlowRow(
                                modifier = Modifier
                                    .weight(1f)
                                    .wrapContentHeight()
                                    .padding(horizontal = 5.dp),
                                verticalArrangement = Arrangement.spacedBy(5.dp),
                                horizontalArrangement = Arrangement.spacedBy(5.dp)
                            ) {
                                with(optimalOrderViewModel.fields.keys) {
                                    if (isEmpty()) Chip(
                                        onClick = {}, colors = ChipDefaults.chipColors(
                                            backgroundColor = Color.White,
                                            contentColor = Color.Black
                                        )
                                    ) {
                                        Text(
                                            "Choose types",
                                            color = MaterialTheme.colors.secondary
                                        )
                                    }
                                    forEach {
                                        Chip(onClick = {}) {
                                            Text(it)
                                        }
                                    }
                                }
                            }
                            ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                        }
                    }
                    ExposedDropdownMenu(
                        expanded = expanded,
                        onDismissRequest = { expanded = false }) {
                        optimalOrderViewModel.types.value.forEach {
                            DropdownMenuItem(onClick = {
                                with(optimalOrderViewModel.fields) {
                                    if (contains(it)) remove(it)
                                    else this[it] =
                                        mutableStateOf(InputState(type = InputType.NUMBER))
                                }
                                expanded = false
                            }) {
                                Text(it)
                                if (optimalOrderViewModel.fields.contains(it)) Icon(
                                    Icons.Default.Check, ""
                                )
                            }
                        }
                    }
                }
                Spacer(modifier = Modifier.height(10.dp))
                with(optimalOrderViewModel) {
                    CustomInputField(
                        modifier = Modifier.fillMaxWidth(),
                        value = maxPrice,
                        label = {
                            Text("Max price")
                        },
                        keyboardOptions = KeyboardOptions.Default.copy(
                            keyboardType = KeyboardType.NumberPassword,
                            imeAction = ImeAction.Next
                        )
                    )
                    fields.forEach { (name, state) ->
                        CustomInputField(
                            modifier = Modifier.fillMaxWidth(),
                            value = state,
                            label = {
                                Text(name)
                            },
                            keyboardOptions = KeyboardOptions.Default.copy(
                                keyboardType = KeyboardType.NumberPassword,
                                imeAction = ImeAction.Done
                            )
                        )
                    }
                }
            }
        },
        buttons = {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                Button(onClick = { dialogOpen = false }) {
                    Text(stringResource(R.string.cancel))
                }
                Spacer(modifier = Modifier.width(5.dp))
                Button(onClick = {
                    optimalOrderViewModel.confirmOptimal(this@OptimalDialogButton, scaffoldState)
                    dialogOpen = false
                }) {
                    Text(stringResource(R.string.confirm))
                }
            }
        })
}
