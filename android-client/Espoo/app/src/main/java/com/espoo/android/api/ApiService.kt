package com.espoo.android.api

import android.content.Context
import android.util.Log
import android.util.MalformedJsonException
import com.espoo.android.model.AuthData
import com.espoo.android.model.Survey
import com.espoo.android.model.User
import okhttp3.OkHttpClient
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface ApiService {

    @POST("/users/sign_in")
    fun login(@Body authData: AuthData): Call<User>

    @GET("/api/v1/surveys")
    fun getSurveys(): Call<List<Survey>>

    companion object {

        private const val BASE_URL = "https://espoo.herokuapp.com"

        fun create(apiToken: String?) : ApiService {

            val httpClient = OkHttpClient.Builder()

            /* This code is due to a backend implementation tha needs to insert the application/json headers
            *  manually in each request */
            httpClient.addInterceptor { chain ->
                val request = chain
                    .request()
                    .newBuilder()
                    .header("Accept", "application/json")
                    .header("Content-Type", "application/json")

                apiToken?.let {
                    request.header("Authorization", it)
                }
                val response = chain.proceed(request.build())

                if (!response.isSuccessful) {
                    try {
                        val jsonResponse = JSONObject(response.peekBody(2048).string())
                        /* TODO Implement a way to communicate between components and classes in Android (LocalBroadcastManager for example)
                           To send the error message to the view and show it to the user */
                        Log.d("TAG_", jsonResponse.getString("error"))
                    } catch (e: MalformedJsonException) {
                        Log.e("ERROR", e.stackTraceToString())
                    }
                }
                response
            }

            val okHttpClient = httpClient.build()

            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(ApiService::class.java)
        }
    }
}