package com.espoo.android.model

data class User(var id: Int, var email: String, var role: Role, var surveys: Array<Survey>) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id
    }
}

data class AuthData(var user: UserLogin)

data class UserLogin(var email: String, var password: String)
