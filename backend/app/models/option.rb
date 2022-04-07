# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  correct     :boolean          default(FALSE)
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  question_id :bigint           not null
#  user_id     :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (question_id => questions.id)
#  fk_rails_...  (user_id => users.id)
#
class Option < ApplicationRecord
  belongs_to :user
  belongs_to :question

  has_many :answers_options, dependent: :destroy
  has_many :answers, through: :answers_options

  validates :name, presence: true, uniqueness: { scope: :question_id }
  validate :validates_correct
  validate :validates_ready

  scope :correct, -> { where(correct: true) }

  delegate :single_choice?, to: :question, allow_nil: true

  scope :by_user, lambda { |user|
    return where(user: user).includes([:answers]) unless user.admin?

    all.includes([:answers])
  }

  private

  def validates_correct
    correct_options_positive = question&.options&.correct&.any?
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.base.cant_create_option')
    return if correct_was

    errors.add(:base, :cant_create_option) if correct && single_choice? && correct_options_positive
  end

  def validates_ready
    one_question = question&.options&.correct&.one?
    # i18n-tasks-use t('activerecord.errors.models.option.attributes.correct.cant_update_correct')

    errors.add(:correct, :cant_update_correct) if correct_state_valid? && question&.ready_to_be_answered && one_question
  end

  def correct_state_valid?
    correct_was && !correct
  end
end
