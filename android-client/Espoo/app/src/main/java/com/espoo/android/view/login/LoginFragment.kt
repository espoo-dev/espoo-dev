package com.espoo.android.view.login

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import com.espoo.android.R
import com.espoo.android.databinding.FragmentLoginBinding
import com.espoo.android.helper.Status
import com.espoo.android.helper.Validator
import com.espoo.android.model.AuthData
import com.espoo.android.model.UserLogin
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class LoginFragment : Fragment() {
    private lateinit var validator: Validator

    private val loginFragmentViewModel: LoginFragmentViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding: FragmentLoginBinding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_login, container, false)
        binding.lifecycleOwner = this
        validator = Validator()

        // TODO Implement conditional start fragment using the Navigation component
        if(loginFragmentViewModel.getSessionManager().isLogin()){
            findNavController().navigate(LoginFragmentDirections.actionLoginFragmentToSurveysFragment())
        }
        binding.loginButton.setOnClickListener {
            val userName = binding.editTextUsername.text.toString()
            val password = binding.editTextPassword.text.toString()
            if (!validator.validateInputNotEmpty(userName)) {
                Toast.makeText(
                    context,
                    "${getString(R.string.login_username)} ${getString(R.string.field_does_not_filled)}",
                    Toast.LENGTH_LONG
                ).show()
            } else if (!validator.validateInputNotEmpty(password)) {
                Toast.makeText(
                    context,
                    "${getString(R.string.login_password)} ${getString(R.string.field_does_not_filled)}",
                    Toast.LENGTH_LONG
                ).show()
            } else {
                login(binding,AuthData(UserLogin(userName, password)))
            }
        }
        return binding.root
    }

    private fun login(binding: FragmentLoginBinding, authData: AuthData) {
        loginFragmentViewModel.login(authData).observe(viewLifecycleOwner, Observer {
            it?.let { resource ->
                when (resource.status) {
                    Status.SUCCESS -> {
                       binding.pgLogin.visibility = View.GONE
                        resource.data?.let { user ->
                            Toast.makeText(activity, user.email, Toast.LENGTH_SHORT).show()
                                                    view?.findNavController()
                            ?.navigate(LoginFragmentDirections.actionLoginFragmentToSurveysFragment())
                        }
                    }
                    Status.ERROR -> {
                        Toast.makeText(activity, it.message, Toast.LENGTH_SHORT).show()
                        binding.pgLogin.visibility = View.GONE
                    }
                    Status.LOADING -> {
                        binding.pgLogin.visibility = View.VISIBLE
                    }
                }
            }
        })
    }

}