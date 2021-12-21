package com.espoo.android.model

import com.google.gson.annotations.SerializedName

data class Survey(var id: Int, @SerializedName("survey_subject_id") var surveySubjectId: Int,
                  var name: String, var description: String, @SerializedName("role_type") var roleType: String,
                  @SerializedName("current_answers_survey") var currentAnswersSurvey: SimpleAnswersSurvey,
                  @SerializedName("answers_surveys") var answersSurvey: Array<SimpleAnswersSurvey>, var questions: Array<Question>) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Survey

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id
    }
}

data class SimpleSurvey(var id: Int, var name: String, var description: String, @SerializedName("questions_quantity") var questionsQuantity: Int)

data class SimpleAnswersSurvey(var id: Int, @SerializedName("user_id") var userId: Int, var status: String)

data class Question(var id: Int, var name: String, var options: Array<Option>) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Question

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id
    }
}

data class Option(var id: Int, var name: String, var correct: Boolean)