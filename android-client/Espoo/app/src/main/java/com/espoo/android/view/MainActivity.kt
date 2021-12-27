package com.espoo.android.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import com.espoo.android.R
import com.espoo.android.adapter.SurveysAdapter
import com.espoo.android.api.ApiService
import com.espoo.android.helper.SessionManager
import com.espoo.android.model.Survey
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var service: ApiService
    private lateinit var sessionManager : SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sessionManager = SessionManager(applicationContext)

        val adapter = SurveysAdapter()
        recyclerViewSurvey.adapter = adapter

        service = ApiService.create(sessionManager.readAPIToken())

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