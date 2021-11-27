package com.espoo.android.view

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.espoo.android.R
import com.espoo.android.helper.SessionManager

class MainActivity : AppCompatActivity() {

    private lateinit var sessionManager : SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sessionManager = SessionManager(applicationContext)
    }

    fun logout(view: View) {
        sessionManager.logout()
        startActivity(Intent(applicationContext, LoginActivity::class.java))
        finish()
    }
}