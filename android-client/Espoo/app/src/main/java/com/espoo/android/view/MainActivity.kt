package com.espoo.android.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import com.espoo.android.R
import com.espoo.android.adapter.SurveysAdapter
import com.espoo.android.api.SurveyService
import com.espoo.android.helper.SessionManager
import com.espoo.android.model.Survey
import okhttp3.OkHttpClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var service: SurveyService
    private lateinit var sessionManager : SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sessionManager = SessionManager(applicationContext)

        val adapter = SurveysAdapter()
        recyclerViewSurvey.adapter = adapter

        val httpClient = OkHttpClient.Builder()
        httpClient.addInterceptor { chain ->
            val request = chain
                .request()
                .newBuilder()
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")

            sessionManager.readAPIToken()?.let {
                request.header("Authorization", it)
            }

            chain.proceed(request.build())
        }

        val okHttpClient = httpClient.build()

        service = Retrofit.Builder()
            .baseUrl("https://espoo.herokuapp.com")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(SurveyService::class.java)

        service.getSurveys()
            .enqueue(object : Callback<List<Survey>> {
                override fun onResponse(call: Call<List<Survey>>, response: Response<List<Survey>>) {
                    Log.d("TAG_", "onResponse: ${response.body()}")
                    Log.d("TAG_", "onResponse: ${response.raw()}")
                    response.body()?.let {
                        adapter.data = it
                    }
                }

                override fun onFailure(call: Call<List<Survey>>, t: Throwable) {
                    Log.e("TAG_", "onFailure: An error happened!")
                    t.printStackTrace()
                }

            })

    }

    fun logout(view: View) {
        sessionManager.logout()
        startActivity(Intent(applicationContext, LoginActivity::class.java))
        finish()
    }
}