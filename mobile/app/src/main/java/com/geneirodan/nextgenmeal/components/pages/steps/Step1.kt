package com.geneirodan.nextgenmeal.components.pages.steps

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.geneirodan.nextgenmeal.R
import com.geneirodan.nextgenmeal.components.Preloader
import com.geneirodan.nextgenmeal.components.SearchField
import com.geneirodan.nextgenmeal.components.cards.ServiceCard
import com.geneirodan.nextgenmeal.viewmodels.NewOrderViewModel
import com.geneirodan.nextgenmeal.viewmodels.ServicesViewModel
import com.xsims.stepper_compose.Step

@Composable
fun NewOrderViewModel.step1(servicesViewModel: ServicesViewModel = viewModel()) = Step(
    title = stringResource(R.string.choose_service), state = stepStates[0]
) {
    Column(
        modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        servicesViewModel.SearchField()
        LazyColumn(
            modifier = Modifier.heightIn(0.dp, 500.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            itemsIndexed(items = servicesViewModel.items.value) { index, service ->
                servicesViewModel.onChangeScrollPosition(index)
                ServiceCard(service = service) {
                    this@step1.apply {
                        serviceId.value = service.id
                        nextStep()
                    }
                }
            }
        }
        if (servicesViewModel.loading.value) Preloader()
    }
}