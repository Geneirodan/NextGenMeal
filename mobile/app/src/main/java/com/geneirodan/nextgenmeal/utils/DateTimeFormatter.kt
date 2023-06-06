package com.geneirodan.nextgenmeal.utils

import android.content.Context
import com.geneirodan.nextgenmeal.R
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter
class DateTimeFormatter{
    companion object{
        fun formatDateTime(time: LocalDateTime, context: Context): String? =
            DateTimeFormatter.ofPattern(context.getString(R.string.datetime_format))
                .format(time)

        fun formatDate(time: LocalDate, context: Context): String? =
            DateTimeFormatter.ofPattern(context.getString(R.string.date_format))
                .format(time)

        fun formatTime(time: LocalTime, context: Context): String? =
            DateTimeFormatter.ofPattern(context.getString(R.string.time_format))
                .format(time)
    }
}