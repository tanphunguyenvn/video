FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'Asdfg12345' }
  end

  factory :share do
    user { association :user }
    title { Faker::Name.name }
    url { Faker::Internet.url }
  end
end
