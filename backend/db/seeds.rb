User.destroy_all
Role.destroy_all
QuestionType.destroy_all
Question.destroy_all
Survey.destroy_all
Option.destroy_all
SurveySubject.destroy_all
Answer.destroy_all

# roles
role_admin = Role.create!(role_type: 'admin')
role_teacher = Role.create!(role_type: 'teacher')
role_student = Role.create!(role_type: 'student')

# users
user_admin = User.create!(email: 'admin@gmail.com', password: '123456', role: role_admin)
user_teacher = User.create!(email: 'teacher@gmail.com', password: '123456', role: role_teacher)
user_student = User.create!(email: 'student@gmail.com', password: '123456', role: role_student)

# survey subjects
animal_subject = SurveySubject.create!(name: "Animal", description: "All the surveys contain questions related to animals.")
color_subject = SurveySubject.create!(name: "Color", description: "All the surveys contain questions related to colors.")

# question types
question_type_single_choice = QuestionType.create!(name: "Single Choice")
question_type_multiple_choice = QuestionType.create!(name: "Multiple Choice")
question_type_free_text = QuestionType.create!(name: "Free Text")

# surveys
survey_admin = Survey.create!(name: 'Colors survey - Admin', user: user_admin, survey_subject_id: color_subject.id)
colors_survey_ready = Survey.create!(name: 'Colors survey - for Children', description: 'Favorite colors', user: user_admin, survey_subject_id: color_subject.id)
teacher_ready_survey = Survey.create!(name: 'Animals survey - Teacher', description: 'Nice animals', user: user_teacher, survey_subject_id: animal_subject.id)
Survey.create!(name: 'Dog survey - Teacher', user: user_teacher, survey_subject_id: animal_subject.id)
Survey.create!(name: 'Bunny survey - Teacher', user: user_teacher, survey_subject_id: animal_subject.id)

# question with options
question_1_survey_admin1 = Question.create!(name: "What is your favorit color?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create!(name: "Red", question: question_1_survey_admin1, user: user_admin)
Option.create!(name: "Blue", question: question_1_survey_admin1, user: user_admin)

question_2_survey_admin1 = Question.create!(name: "What is the RGB for color white?", user: user_admin, survey: survey_admin, question_type: question_type_single_choice)
Option.create!(name: "255,255,255", question: question_2_survey_admin1, user: user_admin)
Option.create!(name: "0,0,0", question: question_2_survey_admin1, user: user_admin)

question_1_survey_teacher = Question.create!(name: "What is your favorite animal?", user: user_teacher, survey: teacher_ready_survey, question_type: question_type_single_choice)
option_correct_question_1_survey_teacher = Option.create!(name: "Eagle", question: question_1_survey_teacher, correct: true, user: user_teacher)
Option.create!(name: "Dog", question: question_1_survey_teacher, user: user_teacher)
question_1_survey_teacher.update!(ready_to_be_answered: true)

question_2_teacher_ready = Question.create!(name: "What is the bigger animal?", user: user_teacher, survey: teacher_ready_survey, question_type: question_type_single_choice)
Option.create!(name: "Cat", question: question_2_teacher_ready, correct: true, user: user_teacher)
option_incorrect_question_2_survey_teacher = Option.create!(name: "Horse", question: question_2_teacher_ready, correct: false, user: user_teacher)
question_2_teacher_ready.update!(ready_to_be_answered: true)

question_1_colors_survey = Question.create!(name: "Translate blue", user: user_admin, survey: colors_survey_ready, question_type: question_type_single_choice)
correct_option_question_1_colors_survey = Option.create!(name: 'azul', question: question_1_colors_survey, correct: true, user: user_admin)
Option.create!(name: 'branco', question: question_1_colors_survey, correct: false, user: user_admin)
question_1_colors_survey.update!(ready_to_be_answered: true)

question_2_colors_survey_ready = Question.create!(name: "Translate red", user: user_admin, survey: colors_survey_ready, question_type: question_type_free_text)
Option.create!(name: 'vermelho', question: question_2_colors_survey_ready, correct: true, user: user_admin)
question_2_colors_survey_ready.update!(ready_to_be_answered: true)

# set surveys ready
teacher_ready_survey.update!(ready: true)
colors_survey_ready.update!(ready: true)

# create answers_survey
answers_survey_colors = AnswersSurvey.create!(survey: colors_survey_ready, user: user_student)
Answer.create!(answers_survey: answers_survey_colors, question: question_1_colors_survey, options: [correct_option_question_1_colors_survey])

answers_survey_teacher = AnswersSurvey.create!(survey: teacher_ready_survey, user: user_student)
Answer.create!(answers_survey: answers_survey_teacher, question: question_1_survey_teacher, options: [option_correct_question_1_survey_teacher])
Answer.create!(answers_survey: answers_survey_teacher, question: question_2_teacher_ready, options: [option_incorrect_question_2_survey_teacher])

FactoryBot.create_list(:ready_survey, 3, user: user_teacher)
