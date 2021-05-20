role_admin = Role.create(role_type: 'admin')
role_teacher = Role.create(role_type: 'teacher')

user_admin = User.create(email: 'admin@gmail.com', password: '123456', role: role_admin)
user_teacher = User.create(email: 'teacher@gmail.com', password: '123456', role: role_teacher)

question_type_single_choice = QuestionType.create(name: "Single Choice")
question_type_free_text = QuestionType.create(name: "Free Text")

survey_admin = Survey.create(name: 'Colors survey - Admin', user: user_admin)
survey_teacher = Survey.create(name: 'Animals survey - Teacher', user: user_teacher)

question_1_survey_admin1 = Question.create(name: "What is your favorit color?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create(option_type: "Red", question: question_1_survey_admin1)
Option.create(option_type: "Blue", question: question_1_survey_admin1)

question_2_survey_admin1 = Question.create(name: "What is the RGB for color white?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create(option_type: "255,255,255", question: question_2_survey_admin1)
Option.create(option_type: "0,0,0", question: question_2_survey_admin1)

question_1_survey_teacher = Question.create(name: "What is your favorite animal?", user: user_teacher, survey: survey_teacher, question_type: question_type_single_choice)
Option.create(option_type: "Eagle", question: question_1_survey_teacher)
Option.create(option_type: "Dog", question: question_1_survey_teacher)

question_2_survey_teacher = Question.create(name: "What is the bigger animal?", user: user_teacher, survey: survey_teacher, question_type: question_type_single_choice)
Option.create(option_type: "Cat", question: question_2_survey_teacher)
Option.create(option_type: "Horse", question: question_2_survey_teacher)
