package com.geneirodan.nextgenmeal.components

import androidx.compose.foundation.layout.Column
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.Composable
import androidx.compose.ui.res.stringResource
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.viewmodels.abstractions.QueryableListViewModel

@Composable
fun <T> QueryableListViewModel<T>.SearchField() {
    Column {
        OutlinedTextField(
            value = params["query"]!!,
            label = {Text(stringResource(R.string.search))},
            onValueChange = { onQueryChange(it) },
            trailingIcon = {
                IconButton(onClick = { newLoad() }) {
                    if (loading.value)
                        CircularProgressIndicator()
                    else
                        Icon(Icons.Default.Search, "")
                }
            })
    }
}