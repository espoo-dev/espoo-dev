package com.espoo.android.view.login

import android.provider.Settings.Global.getString
import android.widget.Toast
import androidx.lifecycle.*
import com.espoo.android.R
import com.espoo.android.api.SessionManager
import com.espoo.android.api.SessionManager.PreferencesConstants.API_TOKEN
import com.espoo.android.helper.Resource
import com.espoo.android.helper.Validator
import com.espoo.android.model.AuthData
import com.espoo.android.model.User
import com.espoo.android.model.UserLogin
import com.espoo.android.repository.LoginRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import java.net.ConnectException
import javax.inject.Inject

@HiltViewModel
class LoginFragmentViewModel
@Inject
constructor(
    private val loginRepository: LoginRepository,
    private val sessionManager: SessionManager
) : ViewModel() {

     val userName =  MutableLiveData<String>()
     val password = MutableLiveData<String>()



    fun login(authData: AuthData) = liveData(Dispatchers.IO) {
        emit(Resource.loading(data = null))
        try {
            val requestLogin = loginRepository.login(authData)
            val responseLogin = requestLogin.execute()
            if (responseLogin.isSuccessful) {
                val user = responseLogin.body()
                user?.let {
                    storeLoginData(it)
                }
                responseLogin.headers()["Authorization"]?.let {
                    sessionManager.storeData(API_TOKEN, it)
                }
                emit(Resource.success(data = responseLogin.body()))
            } else {
                emit(
                    Resource.error(
                        data = null,
                        message = responseLogin.message() ?: "Error Occurred!"
                    )
                )
            }
        } catch (e: ConnectException) {
            emit(Resource.error(data = null, message = e.message ?: "Error Occurred!"))
        } catch (exception: Exception) {
            emit(Resource.error(data = null, message = exception.message ?: "Error Occurred!"))
        }
    }

    fun clickLogin(){
        login(AuthData(UserLogin(userName.toString(),password.toString())))
        val validator = Validator()
        if (!validator.validateInputNotEmpty(userName.toString())) {

        } else if (!validator.validateInputNotEmpty(password.toString())) {

        } else {

        }
    }

    fun getSessionManager() = sessionManager

    fun storeLoginData(user: User) {
        sessionManager.storeData(SessionManager.PreferencesConstants.USER_ID, user.id)
        sessionManager.storeData(SessionManager.PreferencesConstants.EMAIL, user.email)
        sessionManager.storeData(SessionManager.PreferencesConstants.IS_LOGIN, true)
    }
}