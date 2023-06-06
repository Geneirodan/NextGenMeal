package com.geneirodan.nextgenmeal.activities

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.rememberScaffoldState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.geneirodan.nextgenmeal.utils.BottomItem
import com.geneirodan.nextgenmeal.components.LangDropDown
import com.geneirodan.nextgenmeal.components.pages.NewOrderPage
import com.geneirodan.nextgenmeal.components.pages.OrdersPage
import com.geneirodan.nextgenmeal.components.pages.SettingsPage
import com.geneirodan.nextgenmeal.components.AppTheme
import com.geneirodan.nextgenmeal.utils.Role

class MainActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppTheme {
                val navController = rememberNavController()
                scaffoldState = rememberScaffoldState()
                val map = mapOf(
                    Pair(
                        Role.CUSTOMER,
                        listOf(BottomItem.Orders, BottomItem.NewOrders, BottomItem.Settings)
                    ),
                    Pair(Role.EMPLOYEE, listOf(BottomItem.Orders, BottomItem.Settings))
                )
                AppTheme {
                    Scaffold(
                        scaffoldState = scaffoldState,
                        bottomBar = {
                            BottomNavigation(backgroundColor = MaterialTheme.colors.primary) {
                                val backStackEntry by navController.currentBackStackEntryAsState()
                                val currentRoute = backStackEntry?.destination?.route
                                map[role]!!.forEach {
                                    val title = stringResource(it.title)
                                    BottomNavigationItem(
                                        selected = currentRoute == it.route,
                                        onClick = { navController.navigate(it.route) },
                                        icon = { Icon(it.icon, title) },
                                        label = { Text(title) })
                                }
                            }
                        },
                        topBar = {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.End
                            ) {
                                LangDropDown()
                            }
                        }
                    ) {
                        Box(modifier = Modifier.padding(it)) {
                            NavHost(navController = navController, startDestination = "orders") {
                                composable("orders") { OrdersPage() }
                                composable("new_order") { navController.NewOrderPage() }
                                composable("settings") { SettingsPage() }
                            }
                        }
                    }
                }
            }
        }
    }
}

