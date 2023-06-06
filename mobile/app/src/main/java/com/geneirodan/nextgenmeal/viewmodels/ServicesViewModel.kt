package com.geneirodan.nextgenmeal.viewmodels

import com.geneirodan.nextgenmeal.Api.Companion.get
import com.geneirodan.nextgenmeal.data.Service
import com.geneirodan.nextgenmeal.viewmodels.abstractions.QueryableListViewModel

class ServicesViewModel : QueryableListViewModel<Service>() {
    override suspend fun get(params: Map<String, String?>): List<Service> {
        return get("Order/Services", params)
    }
}