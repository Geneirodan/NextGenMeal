package com.geneirodan.nextgenmeal.viewmodels

import com.geneirodan.nextgenmeal.Api.Companion.get
import com.geneirodan.nextgenmeal.data.Catering
import com.geneirodan.nextgenmeal.viewmodels.abstractions.QueryableListViewModel

class CateringViewModel : QueryableListViewModel<Catering>() {
    override suspend fun get(params: Map<String, String?>): List<Catering> =
        get("Catering/${params["serviceId"]}", params)
}