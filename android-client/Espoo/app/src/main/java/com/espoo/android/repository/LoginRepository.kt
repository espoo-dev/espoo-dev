package com.espoo.android.repository

import com.espoo.android.api.ApiService
import com.espoo.android.model.AuthData
import javax.inject.Inject

class LoginRepository @Inject
constructor(private val apiService: ApiService) {

    suspend fun login(authData: AuthData) = apiService.login(authData)
//   suspend  fun login(authData: AuthData) = liveData {
//        try {
//            val request = apiService.login(authData)
//            val response = request.execute()
//            if(response.isSuccessful){
//                emit(LoginResult.Success(data = response.body()))
//            } else {
//                emit(LoginResult.Error(exception = Exception(response.errorBody().toString())))
//            }
//        } catch (e: ConnectException) {
//            emit(LoginResult.Error(exception = Exception("Error trying to communicate with the server")))
//        }
//        catch (e: Exception) {
//            emit(LoginResult.Error(exception = e))
//        }
//    }
//    suspend  fun login(authData: AuthData) {
//         val request = apiService.login(authData)
//         val response = request.execute()
//    if(response.isSuccessful){
//        print(response.errorBody())
//    }
//    }




}