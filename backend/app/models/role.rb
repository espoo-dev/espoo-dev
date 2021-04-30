class Role < ApplicationRecord
    has_many :users, dependent: :nullify
    validates_presence_of :role_type


    def admin?
        role_type == "admin"
    end
end
