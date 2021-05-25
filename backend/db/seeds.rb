role_admin = Role.create(role_type: 'admin')
role_teacher = Role.create(role_type: 'teacher')

user_admin = User.create(email: 'admin@gmail.com', password: '123456', role: role_admin)
user_teacher = User.create(email: 'teacher@gmail.com', password: '123456', role: role_teacher)

question_type_single_choice = QuestionType.create(name: "Single Choice")
question_type_free_text = QuestionType.create(name: "Free Text")

survey_admin = Survey.create(name: 'Colors survey - Admin', user: user_admin)
survey_teacher = Survey.create(name: 'Animals survey - Teacher', user: user_teacher)

question_1_survey_admin1 = Question.create(name: "What is your favorit color?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create(name: "Red", question: question_1_survey_admin1)
Option.create(name: "Blue", question: question_1_survey_admin1)

question_2_survey_admin1 = Question.create(name: "What is the RGB for color white?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create(name: "255,255,255", question: question_2_survey_admin1)
Option.create(name: "0,0,0", question: question_2_survey_admin1)

question_1_survey_teacher = Question.create(name: "What is your favorite animal?", user: user_teacher, survey: survey_teacher, question_type: question_type_single_choice)
Option.create(name: "Eagle", question: question_1_survey_teacher)
Option.create(name: "Dog", question: question_1_survey_teacher)

question_2_survey_teacher = Question.create(name: "What is the bigger animal?", user: user_teacher, survey: survey_teacher, question_type: question_type_single_choice)
Option.create(name: "Cat", question: question_2_survey_teacher)
Option.create(name: "Horse", question: question_2_survey_teacher)
