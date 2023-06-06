package com.geneirodan.nextgenmeal.viewmodels.abstractions

abstract class QueryableListViewModel<T> : ListViewModel<T>() {
    init{
        onQueryChange("")
    }

    fun onQueryChange(query: String?) {
        params["query"] = query
    }
}