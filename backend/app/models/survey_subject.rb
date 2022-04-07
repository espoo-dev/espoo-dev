# == Schema Information
#
# Table name: survey_subjects
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class SurveySubject < ApplicationRecord
  has_many :surveys, dependent: :destroy

  before_destroy :check_surveys_before_destroy, prepend: true

  validates :name, :description, presence: true

  private

  def check_surveys_before_destroy
    survey_count = Survey.where(survey_subject_id: id)

    return unless survey_count.any?

    # i18n-tasks-use t('activerecord.errors.models.survey_subject.attributes.surveys.cant_destroy_survey_subject')
    errors.add(:surveys, :cant_destroy_survey_subject, survey_count: survey_count.count)

    throw :abort
  end
end
