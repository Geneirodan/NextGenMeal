package com.geneirodan.nextgenmeal.viewmodels

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class AccordionViewModel<DataModel> : ViewModel() {
    private val itemsList = MutableStateFlow(listOf<DataModel>())
    val items: StateFlow<List<DataModel>> get() = itemsList


    private fun getData() {
    }
}