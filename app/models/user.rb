class User < ApplicationRecord
  validates :email, email: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 10, maximum: 50 }
  
  has_secure_password
  has_many :video
end
