package com.geneirodan.nextgenmeal.components.cards

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.Card
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Inventory2
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.data.Catering

@Composable
fun CateringCard(catering: Catering, onClick: () -> Unit) {
    with(catering){
        Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick)) {
            Column(modifier = Modifier.padding(5.dp)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "${stringResource(R.string.name)}: $name ")
                    terminal?.apply{
                        Icon(
                            Icons.Outlined.Inventory2,
                            "",
                            modifier = Modifier.size(16.dp),
                            tint = MaterialTheme.colors.primary
                        )
                    }
                }
                Text(text = "${stringResource(R.string.city)}: $city")
                Text(text = "${stringResource(R.string.state)}: $state")
                Text(text = "${stringResource(R.string.street)}: $street")
            }
        }
    }
}