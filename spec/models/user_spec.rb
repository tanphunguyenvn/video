require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(10) }
    it { should validate_length_of(:password).is_at_most(50) }
  end
end
