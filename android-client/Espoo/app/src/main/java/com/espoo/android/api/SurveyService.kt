package com.espoo.android.api

import com.espoo.android.model.Survey
import retrofit2.Call
import retrofit2.http.GET

interface SurveyService {
    @GET("/api/v1/surveys")
    fun getSurveys(): Call<List<Survey>>
}