package com.geneirodan.nextgenmeal.components.pages

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.geneirodan.nextgenmeal.components.pages.steps.step1
import com.geneirodan.nextgenmeal.components.pages.steps.step2
import com.geneirodan.nextgenmeal.components.pages.steps.step3
import com.geneirodan.nextgenmeal.components.pages.steps.step4
import com.geneirodan.nextgenmeal.viewmodels.NewOrderViewModel
import com.xsims.stepper_compose.StepUi

@Composable
fun NavHostController.NewOrderPage(newOrderViewModel: NewOrderViewModel = viewModel()) {
    val steps = arrayListOf(
        newOrderViewModel.step1(),
        newOrderViewModel.step2(),
        newOrderViewModel.step3(),
        newOrderViewModel.step4(this)
    )
    Column(modifier = Modifier
        .padding(horizontal = 20.dp)
        .verticalScroll(
            state = rememberScrollState(1),
            enabled = true,
            reverseScrolling = false,
        )) {
        Spacer(modifier = Modifier.height(10.dp))
        steps.forEachIndexed { index, step ->
            StepUi(
                modifier = Modifier.clickable { newOrderViewModel.currentStep.intValue = index },
                index = index + 1,
                step = step,
                expanded = index == newOrderViewModel.currentStep.intValue,
                isLastStep = index == (steps.size - 1)
            )
        }
    }
}


