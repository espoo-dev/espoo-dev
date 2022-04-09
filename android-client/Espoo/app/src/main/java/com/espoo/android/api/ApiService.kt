package com.espoo.android.api

import com.espoo.android.model.AuthData
import com.espoo.android.model.Survey
import com.espoo.android.model.User
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {
    @POST("/users/sign_in")
    fun login(@Body authData: AuthData): Call<User>

    @GET("/api/v1/surveys")
    fun getSurveys(): Call<List<Survey>>

}