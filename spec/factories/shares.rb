FactoryBot.define do
  factory :share do
    title { Faker::Name.name }
    url { Faker::Internet.url }
  end
end
