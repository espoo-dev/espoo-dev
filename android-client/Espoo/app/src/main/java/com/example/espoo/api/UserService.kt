package com.example.espoo.api

import com.example.espoo.model.AuthData
import com.example.espoo.model.User
import com.example.espoo.model.UserLogin
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface UserService {
    @POST("/users/sign_in")
    fun login(@Body authData: AuthData): Call<User>
}