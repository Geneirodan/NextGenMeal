package com.geneirodan.nextgenmeal.utils

import androidx.annotation.StringRes
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.AddCircleOutline
import androidx.compose.material.icons.outlined.ListAlt
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.ui.graphics.vector.ImageVector
import com.geneirodan.nextgenmeal.R

sealed class BottomItem(@StringRes val title: Int, val icon: ImageVector, val route: String) {
    object Orders : BottomItem(R.string.orders, Icons.Outlined.ListAlt, "orders")
    object NewOrders : BottomItem(R.string.new_order, Icons.Outlined.AddCircleOutline, "new_order")
    object Settings : BottomItem(R.string.settings, Icons.Outlined.Settings, "settings")
}

