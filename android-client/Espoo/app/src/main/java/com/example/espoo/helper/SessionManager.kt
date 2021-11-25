package com.example.espoo.helper

import android.content.Context
import android.content.Context.MODE_PRIVATE
import android.content.SharedPreferences

class SessionManager(val context: Context) {
    private var preferences: SharedPreferences
    private var editor: SharedPreferences.Editor
    private var preferencesFileName: String = context.packageName

    object PreferencesConstants {
        const val KEY_USER_ID = "user_id"
        const val KEY_EMAIL = "email"
        const val KEY_IS_LOGIN = "is_login"
    }

    init {
        preferences = context.getSharedPreferences(preferencesFileName, MODE_PRIVATE)
        editor = preferences.edit()
    }

    internal fun storeUserId(userId: Int) {
        editor.putInt(PreferencesConstants.KEY_USER_ID, userId)
    }

    internal fun readUserId() : Int {
        return preferences.getInt(PreferencesConstants.KEY_USER_ID, 0)
    }

    internal fun storeEmail(email: String) {
        editor.putString(PreferencesConstants.KEY_EMAIL, email)
    }

    internal fun readEmail(): String? {
        return preferences.getString(PreferencesConstants.KEY_EMAIL, "")
    }

    internal fun login() {
        editor.putBoolean(PreferencesConstants.KEY_IS_LOGIN, true)
    }

    internal fun isLogin(): Boolean {
        return preferences.getBoolean(PreferencesConstants.KEY_IS_LOGIN, false)
    }

    internal fun logout() {
        editor.clear()
        editor.apply()
    }
}