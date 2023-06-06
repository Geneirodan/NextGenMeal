package com.geneirodan.nextgenmeal.utils

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.activity.result.contract.ActivityResultContract
import com.geneirodan.nextgenmeal.activities.OrderActivity
import com.geneirodan.nextgenmeal.data.Order
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class OrderContract : ActivityResultContract<Order, Boolean>() {
    override fun createIntent(context: Context, input: Order): Intent =
        Intent(context, OrderActivity::class.java).putExtra(
            "Order",
            Json.encodeToString(input)
        )

    override fun parseResult(resultCode: Int, intent: Intent?): Boolean =
        resultCode == Activity.RESULT_OK
}