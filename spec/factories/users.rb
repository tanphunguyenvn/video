FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'Asdfg12345' }
  end
end
