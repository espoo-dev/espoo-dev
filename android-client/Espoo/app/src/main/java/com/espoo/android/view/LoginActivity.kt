package com.espoo.android.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import com.espoo.android.R
import com.espoo.android.api.ApiService
import com.espoo.android.databinding.ActivityLoginBinding
import com.espoo.android.helper.SessionManager
import com.espoo.android.helper.SessionManager.PreferencesConstants.API_TOKEN
import com.espoo.android.helper.SessionManager.PreferencesConstants.IS_LOGIN
import com.espoo.android.helper.SessionManager.PreferencesConstants.USER_ID
import com.espoo.android.helper.SessionManager.PreferencesConstants.EMAIL
import com.espoo.android.helper.Validator
import com.espoo.android.model.AuthData
import com.espoo.android.model.User
import com.espoo.android.model.UserLogin
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var service: ApiService
    lateinit var sessionManager : SessionManager
    private lateinit var binding: ActivityLoginBinding
    private lateinit var validator: Validator

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_login)
        validator = Validator()

        sessionManager = SessionManager(applicationContext)
        if (sessionManager.isLogin()) {
            openMainActivity()
        }

        service = ApiService.create("")
    }

    fun login(view: View) {
        val userName = binding.editTextUsername.text.toString()
        val password = binding.editTextPassword.text.toString()
        if (!validator.validateInputNotEmpty(userName)) {
            Toast.makeText(this,
                "${getString(R.string.login_username)} ${getString(R.string.field_does_not_filled)}",
                Toast.LENGTH_LONG).show()
        } else if (!validator.validateInputNotEmpty(password)) {
            Toast.makeText(this,
                "${getString(R.string.login_password)} ${getString(R.string.field_does_not_filled)}",
                Toast.LENGTH_LONG).show()
        } else {
            service.login(AuthData(UserLogin(userName, password))).enqueue(object :Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    if (response.isSuccessful) {
                        response.body()?.let {
                            storeLoginData(it)
                            openMainActivity()
                        }
                        response.headers()["Authorization"]?.let {
                            sessionManager.storeData(API_TOKEN, it)
                        }
                    }
                }
                override fun onFailure(call: Call<User>, t: Throwable) {
                    Log.e("TAG_", "onFailure: An error happened!")
                    t.printStackTrace()
                }
            })
        }
    }

    private fun openMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    fun storeLoginData(user: User) {
        sessionManager.storeData(USER_ID, user.id)
        sessionManager.storeData(EMAIL, user.email)
        Toast.makeText(
            applicationContext,
            "${getString(R.string.welcome)} ${user.email}",
            Toast.LENGTH_LONG
        ).show()
        sessionManager.storeData(IS_LOGIN, true)
    }
}