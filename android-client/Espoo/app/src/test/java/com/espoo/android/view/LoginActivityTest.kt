package com.espoo.android.view

import com.espoo.android.model.Role
import com.espoo.android.model.SimpleSurvey
import com.espoo.android.model.User
import junit.framework.TestCase

class LoginActivityTest : TestCase() {

    fun testStoreLoginData() {
        val loginActivityTest = LoginActivity()
        val user = User (1, "", Role(1,""), arrayOf<SimpleSurvey>())
        user.email = "test@email.com"
        loginActivityTest.storeLoginData(user)

        assertEquals(loginActivityTest.sessionManager.readUserId(), user.id)
        assertEquals(loginActivityTest.sessionManager.readEmail(), user.email)
        assert(loginActivityTest.sessionManager.isLogin())
    }
}