FactoryBot.define do
  factory :single_option, class: "Option" do
    option_type { "option 1" }
  end

  factory :multi_option, class: "Option" do
    option_type { "option 1, option 2" }
  end
end
