package com.geneirodan.nextgenmeal.components

import androidx.annotation.StringRes
import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AddCircleOutline
import androidx.compose.material.icons.outlined.ListAlt
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.geneirodan.nextgenmeal.R

sealed class BottomItem(@StringRes val title: Int, val icon: ImageVector, val route: String) {
    object Orders : BottomItem(R.string.orders, Icons.Outlined.ListAlt, "orders")
    object NewOrders : BottomItem(R.string.new_order, Icons.Outlined.AddCircleOutline, "new_order")
    object Settings : BottomItem(R.string.settings, Icons.Outlined.Settings, "settings")
}

@Composable
fun CommonBottomNavigation(navController: NavController, listItems: List<BottomItem>) {
    val context = LocalContext.current
    BottomNavigation(backgroundColor = MaterialTheme.colors.primary) {
        val backStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = backStackEntry?.destination?.route
        listItems.forEach {
            val title = context.getString(it.title)
            BottomNavigationItem(
                selected = currentRoute == it.route,
                onClick = { navController.navigate(it.route) },
                icon = { Icon(it.icon, title) },
                label = { Text(title) })
        }
    }
}