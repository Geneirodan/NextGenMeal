package com.geneirodan.nextgenmeal.activities

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.material.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.compose.rememberNavController
import com.geneirodan.nextgenmeal.components.BottomItem
import com.geneirodan.nextgenmeal.components.CommonBottomNavigation
import com.geneirodan.nextgenmeal.graphs.NavGraph

class CustomerActivity : BaseActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            Content()
        }
    }

    @Preview
    @Composable
    private fun Content() {
        UserContent("Customer")
    }
}

@Composable
fun UserContent(role: String) {
    val navController = rememberNavController()
    Scaffold(
        bottomBar = {
            CommonBottomNavigation(
                navController = navController,
                listItems = listOf(BottomItem.NewOrders, BottomItem.Orders, BottomItem.Settings)
            )
        }
    ) {
        Box(modifier = Modifier.padding(it)) {
            NavGraph(navHostController = navController)
        }
    }
}