package com.geneirodan.nextgenmeal.components.pages

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.DropdownMenu
import androidx.compose.material.DropdownMenuItem
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DriveFileRenameOutline
import androidx.compose.material.icons.filled.MoreVert
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
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.activities.BaseActivity.Companion.role
import com.geneirodan.nextgenmeal.components.CustomInputField
import com.geneirodan.nextgenmeal.utils.Measurements
import com.geneirodan.nextgenmeal.utils.Measurements.Companion.onChange
import com.geneirodan.nextgenmeal.utils.Measurements.Companion.selectedUnit
import com.geneirodan.nextgenmeal.utils.Measurements.Companion.units
import com.geneirodan.nextgenmeal.utils.Role
import com.geneirodan.nextgenmeal.viewmodels.UserViewModel

@Composable
@Preview
fun SettingsPage(userViewModel: UserViewModel = viewModel()) {
    val context = LocalContext.current
    var expanded by remember { mutableStateOf(false) }
    var dialogOpen by remember { mutableStateOf(false) }
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceEvenly
    ) {
        Text(text = stringResource(R.string.settings), style = MaterialTheme.typography.h3)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text(text = "${stringResource(R.string.username)}: ${userViewModel.user.value.name}")
            if (role == Role.CUSTOMER) {
                IconButton(onClick = { dialogOpen = true }) {
                    Icon(Icons.Default.DriveFileRenameOutline, "")
                }

                if (dialogOpen) AlertDialog(onDismissRequest = { dialogOpen = false }, text = {
                    CustomInputField(value = userViewModel.newName,
                        label = { Text(stringResource(R.string.new_name)) })
                }, buttons = {
                    Row(
                        modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End
                    ) {
                        Button(onClick = { dialogOpen = false }) {
                            Text(stringResource(R.string.cancel))
                        }
                        Spacer(modifier = Modifier.width(5.dp))
                        Button(onClick = {
                            userViewModel.changeName(context)
                            dialogOpen = false
                        }) {
                            Text(stringResource(R.string.confirm))
                        }
                    }
                })
            }
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("${stringResource(R.string.measure_unit)}: ${selectedUnit.value}")
            IconButton(onClick = { expanded = true }) { Icon(Icons.Default.MoreVert, "") }
            DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                units.forEach {
                    DropdownMenuItem(onClick = { onChange(it) }) {
                        Text(
                            stringResource(Measurements.unitNames[it]!!)
                        )
                    }
                }
            }
        }
        Button(
            onClick = { userViewModel.logout(context) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(80.dp)
        ) {
            Text(stringResource(R.string.log_out))
        }
    }
}