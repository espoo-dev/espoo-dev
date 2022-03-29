package com.espoo.android.view

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.Navigation
import androidx.navigation.findNavController
import com.espoo.android.R
import com.espoo.android.api.ApiService
import com.espoo.android.databinding.FragmentLoginBinding
import com.espoo.android.helper.SessionManager
import com.espoo.android.helper.SessionManager.PreferencesConstants.API_TOKEN
import com.espoo.android.helper.SessionManager.PreferencesConstants.EMAIL
import com.espoo.android.helper.SessionManager.PreferencesConstants.IS_LOGIN
import com.espoo.android.helper.SessionManager.PreferencesConstants.USER_ID
import com.espoo.android.helper.Validator
import com.espoo.android.model.AuthData
import com.espoo.android.model.User
import com.espoo.android.model.UserLogin
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginFragment : Fragment() {

    private lateinit var service: ApiService
    private lateinit var sessionManager : SessionManager
    private lateinit var validator: Validator

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentLoginBinding = DataBindingUtil.inflate(inflater, R.layout.fragment_login, container, false)
        validator = Validator()
        service = ApiService.create("")
        sessionManager = context?.let { SessionManager(it) }!!
        // TODO Implement conditional start fragment using the Navigation component
//        if (sessionManager.isLogin()) {
//            Open Surveys Fragment
//        }
        binding.loginButton.setOnClickListener { view ->

            val userName = binding.editTextUsername.text.toString()
            val password = binding.editTextPassword.text.toString()
            if (!validator.validateInputNotEmpty(userName)) {
                Toast.makeText(context,
                    "${getString(R.string.login_username)} ${getString(R.string.field_does_not_filled)}",
                    Toast.LENGTH_LONG).show()
            } else if (!validator.validateInputNotEmpty(password)) {
                Toast.makeText(context,
                    "${getString(R.string.login_password)} ${getString(R.string.field_does_not_filled)}",
                    Toast.LENGTH_LONG).show()
            } else {
                service.login(AuthData(UserLogin(userName, password))).enqueue(object :Callback<User> {
                    override fun onResponse(call: Call<User>, response: Response<User>) {
                        if (response.isSuccessful) {
                            response.body()?.let {
                                storeLoginData(it)
                                view.findNavController().navigate(R.id.action_loginFragment_to_surveysFragment)
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
        return binding.root
    }

    fun storeLoginData(user: User) {
        sessionManager.storeData(USER_ID, user.id)
        sessionManager.storeData(EMAIL, user.email)
        Toast.makeText(
            context,
            "${getString(R.string.welcome)} ${user.email}",
            Toast.LENGTH_LONG
        ).show()
        sessionManager.storeData(IS_LOGIN, true)
    }

}