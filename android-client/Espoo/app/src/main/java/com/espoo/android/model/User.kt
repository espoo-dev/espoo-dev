package com.espoo.android.model

data class User(var id: Int, var email: String, var role: Role, var surveys: Array<SimpleSurvey>)

data class AuthData(var user: UserLogin)

data class UserLogin(var email: String, var password: String)