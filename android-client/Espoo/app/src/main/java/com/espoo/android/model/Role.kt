package com.espoo.android.model

import com.google.gson.annotations.SerializedName

data class Role(var id: Int, @SerializedName("role_type") var roleType: String)