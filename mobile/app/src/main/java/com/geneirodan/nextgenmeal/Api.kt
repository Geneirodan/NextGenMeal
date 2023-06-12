package com.geneirodan.nextgenmeal

import android.util.Log
import androidx.compose.material.ScaffoldState
import com.geneirodan.nextgenmeal.NextGenMealApp.Companion.client
import com.geneirodan.nextgenmeal.data.PaggedArray
import com.geneirodan.nextgenmeal.data.ProblemDetails
import io.ktor.client.call.body
import io.ktor.client.request.get
import io.ktor.client.request.patch
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.contentType

class Api {
    companion object {
        suspend inline fun <reified T> get(
            url: String, params: Map<String, String?>? = null
        ): List<T> {
            val response = client.get(url) {
                url {
                    params?.forEach { (name, value) ->
                        value?.apply { parameters.append(name, value) }
                    }
                }
            }
            return if (response.status == HttpStatusCode.OK) response.body<PaggedArray<T>>().items
            else emptyList()
        }

        suspend inline fun <reified T> post(
            url: String, params: Map<String, String?>? = null, body: T
        ) = client.post(url) {
            url {
                params?.forEach { (name, value) ->
                    value?.apply { parameters.append(name, value) }
                }
            }
            contentType(ContentType.Application.Json)
            setBody(body)
        }

        suspend inline fun <reified T> patch(
            url: String, params: Map<String, String?>? = null, body: T
        ) = client.patch(url) {
            url {
                params?.forEach { (name, value) ->
                    value?.apply { parameters.append(name, value) }
                }
            }
            contentType(ContentType.Application.Json)
            setBody(body)
        }

        suspend fun handleError(response: HttpResponse, scaffoldState: ScaffoldState) {
            val sb = StringBuilder()
            response.body<ProblemDetails>().errors?.forEach { (_, v) ->
                v.forEach { error -> sb.append("$error\n") }
            }
            if (sb.isNotEmpty()) sb.deleteCharAt(sb.length - 1)
            scaffoldState.snackbarHostState.showSnackbar(sb.toString())
        }
    }
}