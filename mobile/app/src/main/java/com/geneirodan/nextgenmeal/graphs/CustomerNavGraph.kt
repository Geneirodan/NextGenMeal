package com.geneirodan.nextgenmeal.graphs

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.geneirodan.nextgenmeal.fragments.NewOrder
import com.geneirodan.nextgenmeal.fragments.Orders
import com.geneirodan.nextgenmeal.fragments.Settings

@Composable
fun NavGraph(navHostController: NavHostController) {
    NavHost(navController = navHostController, startDestination = "orders") {
        composable("orders") { Orders() }
        composable("new_order") { NewOrder() }
        composable("settings") { Settings() }
    }
}