package com.espoo.android.api

import com.espoo.android.model.AuthData
import com.espoo.android.model.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface UserService {
    @POST("/users/sign_in")
    fun login(@Body authData: AuthData): Call<User>
}