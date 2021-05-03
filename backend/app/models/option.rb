class Option < ApplicationRecord
    has_many :questions

    validates_presence_of :option_type
end
