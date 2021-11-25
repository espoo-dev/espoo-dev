package com.example.espoo.view

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import com.example.espoo.R
import com.example.espoo.api.UserService
import com.example.espoo.helper.SessionManager
import com.example.espoo.model.AuthData
import com.example.espoo.model.User
import com.example.espoo.model.UserLogin
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import kotlinx.android.synthetic.main.activity_login.*
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {

    private lateinit var service: UserService
    val sessionManager = SessionManager(applicationContext)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val httpClient = OkHttpClient.Builder()
        httpClient.addInterceptor { chain ->
            val request = chain
                .request()
                .newBuilder()
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .build()

            chain.proceed(request)
        }

        //TODO handle timeout exception in first request to wake up heroku app

        val okHttpClient = httpClient.build()

        service = Retrofit.Builder()
            .baseUrl("https://espoo.herokuapp.com")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(UserService::class.java)
    }

    fun login(view: View) {
        service.login(AuthData(UserLogin(editTextUsername.text.toString(), editTextPassword.text.toString())))
            .enqueue(object :Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {

                    val user = response.body()
                    user?.let {
                        sessionManager.storeUserId(it.id)
                        sessionManager.storeEmail(it.email)
                    }
                    sessionManager.login()
                }

                override fun onFailure(call: Call<User>, t: Throwable) {
                    Log.e("TAG_", "onFailure: An error happened!")
                    t.printStackTrace()
                }

            })
    }
}