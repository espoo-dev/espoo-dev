package com.espoo.android.helper

import android.content.Context
import android.content.Context.MODE_PRIVATE
import android.content.SharedPreferences

class SessionManager(val context: Context) {
    private var preferences: SharedPreferences
    private var editor: SharedPreferences.Editor

    object PreferencesConstants {
        const val USER_ID = "user_id"
        const val EMAIL = "email"
        const val IS_LOGIN = "is_login"
        const val API_TOKEN = "api_token"
    }

    init {
        var preferencesFileName: String = context.packageName
        preferences = context.getSharedPreferences(preferencesFileName, MODE_PRIVATE)
        editor = preferences.edit()
    }

    internal fun storeData(key: String, value: Any) {
        when(value) {
            is Int -> editor.putInt(key, value)
            is String -> editor.putString(key, value)
            is Boolean -> editor.putBoolean(key, value)
        }
        editor.apply()
    }

    internal fun readUserId() : Int {
        return preferences.getInt(PreferencesConstants.USER_ID, 0)
    }

    internal fun readEmail(): String? {
        return preferences.getString(PreferencesConstants.EMAIL, "")
    }

    internal fun isLogin(): Boolean {
        return preferences.getBoolean(PreferencesConstants.IS_LOGIN, false)
    }

    internal fun readAPIToken() : String? {
        return preferences.getString(PreferencesConstants.API_TOKEN, "")
    }

    internal fun logout() {
        editor.clear()
        editor.apply()
    }
}