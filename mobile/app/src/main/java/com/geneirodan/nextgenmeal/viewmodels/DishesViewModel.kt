package com.geneirodan.nextgenmeal.viewmodels

import com.geneirodan.nextgenmeal.Api.Companion.get
import com.geneirodan.nextgenmeal.data.Dish
import com.geneirodan.nextgenmeal.viewmodels.abstractions.QueryableListViewModel

class DishesViewModel : QueryableListViewModel<Dish>() {
    override suspend fun get(params: Map<String, String?>): List<Dish> = get("Dish", params)
}