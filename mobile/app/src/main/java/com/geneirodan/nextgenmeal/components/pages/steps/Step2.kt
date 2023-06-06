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
import com.geneirodan.nextgenmeal.components.cards.CateringCard
import com.geneirodan.nextgenmeal.viewmodels.CateringViewModel
import com.geneirodan.nextgenmeal.viewmodels.NewOrderViewModel
import com.xsims.stepper_compose.Step

@Composable
fun NewOrderViewModel.step2(cateringViewModel: CateringViewModel = viewModel()) = Step(
    title = stringResource(R.string.choose_catering), state = stepStates[1]
) {
    HandleBack()
    cateringViewModel.setParam("serviceId", serviceId.value)
    Column(
        modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        cateringViewModel.SearchField()
        LazyColumn(
            modifier = Modifier.heightIn(0.dp, 500.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            itemsIndexed(items = cateringViewModel.items.value) { index, catering ->
                cateringViewModel.onChangeScrollPosition(index)
                CateringCard(catering = catering) {
                    cateringId.intValue = catering.id
                    nextStep()
                }
            }
        }
        if (cateringViewModel.loading.value) Preloader()
    }
}


