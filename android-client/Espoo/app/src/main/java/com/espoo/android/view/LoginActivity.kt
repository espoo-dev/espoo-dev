package com.espoo.android.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.espoo.android.R
import com.espoo.android.api.ApiService
import com.espoo.android.helper.SessionManager
import com.espoo.android.helper.SessionManager.PreferencesConstants.API_TOKEN
import com.espoo.android.helper.SessionManager.PreferencesConstants.IS_LOGIN
import com.espoo.android.helper.SessionManager.PreferencesConstants.USER_ID
import com.espoo.android.helper.SessionManager.PreferencesConstants.EMAIL
import com.espoo.android.model.AuthData
import com.espoo.android.model.User
import com.espoo.android.model.UserLogin
import kotlinx.android.synthetic.main.activity_login.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var service: ApiService
    private lateinit var sessionManager : SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        sessionManager = SessionManager(applicationContext)
        if (sessionManager.isLogin()) {
            openMainActivity()
        }

        service = ApiService.create("")
    }

    fun login(view: View) {
        service.login(AuthData(UserLogin(editTextUsername.text.toString(), editTextPassword.text.toString())))
            .enqueue(object :Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    storeLoginData(response)
                    openMainActivity()
                }

                override fun onFailure(call: Call<User>, t: Throwable) {
                    Log.e("TAG_", "onFailure: An error happened!")
                    t.printStackTrace()
                }
            })
    }

    private fun openMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    private fun storeLoginData(response: Response<User>) {
        val user = response.body()
        user?.let {
            sessionManager.storeData(USER_ID, it.id)
            sessionManager.storeData(EMAIL, it.email)
            Toast.makeText(
                applicationContext,
                "${getString(R.string.welcome)} ${it.email}",
                Toast.LENGTH_LONG
            ).show()
        }
        response.headers()["Authorization"]?.let {
            sessionManager.storeData(API_TOKEN, it)
        }
        sessionManager.storeData(IS_LOGIN, true)
    }
}