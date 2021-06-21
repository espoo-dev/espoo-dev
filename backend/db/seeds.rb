User.destroy_all
Role.destroy_all
QuestionType.destroy_all
Question.destroy_all
Survey.destroy_all
Option.destroy_all

role_admin = Role.create(role_type: 'admin')
role_teacher = Role.create(role_type: 'teacher')
role_student = Role.create(role_type: 'student')

user_admin = User.create(email: 'admin@gmail.com', password: '123456', role: role_admin)
user_teacher = User.create(email: 'teacher@gmail.com', password: '123456', role: role_teacher)
user_student = User.create(email: 'student@gmail.com', password: '123456', role: role_student)

question_type_single_choice = QuestionType.create(name: "Single Choice")
question_type_multiple_choice = QuestionType.create(name: "Multiple Choice")

survey_admin = Survey.create(name: 'Colors survey - Admin', user: user_admin)
ready_survey_teacher = Survey.create(name: 'Animals survey - Teacher', user: user_teacher)

Survey.create(name: 'Dog survey - Teacher', user: user_teacher)
Survey.create(name: 'Bunny survey - Teacher', user: user_teacher)

question_1_survey_admin1 = Question.create(name: "What is your favorit color?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create(name: "Red", question: question_1_survey_admin1, user: user_admin)
Option.create(name: "Blue", question: question_1_survey_admin1, user: user_admin)

question_2_survey_admin1 = Question.create(name: "What is the RGB for color white?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create(name: "255,255,255", question: question_2_survey_admin1, user: user_admin)
Option.create(name: "0,0,0", question: question_2_survey_admin1, user: user_admin)

question_1_survey_teacher = Question.create(name: "What is your favorite animal?", user: user_teacher, survey: ready_survey_teacher, question_type: question_type_single_choice)
Option.create(name: "Eagle", question: question_1_survey_teacher, correct: true, user: user_teacher)
Option.create(name: "Dog", question: question_1_survey_teacher, user: user_teacher)
question_1_survey_teacher.update(ready_to_be_answered: true)

question_2_ready_survey_teacher = Question.create(name: "What is the bigger animal?", user: user_teacher, survey: ready_survey_teacher, question_type: question_type_single_choice)
Option.create(name: "Cat", question: question_2_ready_survey_teacher, correct: true, user: user_teacher)
Option.create(name: "Horse", question: question_2_ready_survey_teacher, user: user_teacher)
question_2_ready_survey_teacher.update(ready_to_be_answered: true)

ready_survey_teacher.update(ready: true)
