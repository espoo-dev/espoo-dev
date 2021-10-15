# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_26_072050) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "answers_survey_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "user_answer"
    t.index ["answers_survey_id"], name: "index_answers_on_answers_survey_id"
    t.index ["question_id", "answers_survey_id"], name: "index_answers_on_question_id_and_answers_survey_id", unique: true
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "answers_options", force: :cascade do |t|
    t.bigint "answer_id", null: false
    t.bigint "option_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["answer_id"], name: "index_answers_options_on_answer_id"
    t.index ["option_id"], name: "index_answers_options_on_option_id"
  end

  create_table "answers_surveys", force: :cascade do |t|
    t.bigint "survey_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["survey_id"], name: "index_answers_surveys_on_survey_id"
    t.index ["user_id"], name: "index_answers_surveys_on_user_id"
  end

  create_table "options", force: :cascade do |t|
    t.string "name"
    t.bigint "question_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.boolean "correct", default: false
    t.index ["name", "question_id"], name: "index_options_on_name_and_question_id", unique: true
    t.index ["question_id"], name: "index_options_on_question_id"
    t.index ["user_id"], name: "index_options_on_user_id"
  end

  create_table "question_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_question_types_on_name", unique: true
  end

  create_table "questions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "question_type_id", null: false
    t.integer "survey_id"
    t.integer "user_id", null: false
    t.boolean "ready_to_be_answered", default: false
    t.index ["name", "user_id"], name: "index_questions_on_name_and_user_id", unique: true
    t.index ["question_type_id"], name: "index_questions_on_question_type_id"
    t.index ["survey_id"], name: "index_questions_on_survey_id"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "role_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["role_type"], name: "index_roles_on_role_type", unique: true
  end

  create_table "survey_subjects", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "surveys", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "ready", default: false
    t.bigint "survey_subject_id", null: false
    t.index ["survey_subject_id"], name: "index_surveys_on_survey_subject_id"
    t.index ["user_id"], name: "index_surveys_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "phone"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "role_id", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "answers_options", "answers"
  add_foreign_key "answers_options", "options"
  add_foreign_key "options", "questions"
  add_foreign_key "options", "users"
  add_foreign_key "surveys", "survey_subjects"
  add_foreign_key "users", "roles"
end
