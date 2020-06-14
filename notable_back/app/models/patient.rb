class Patient < ApplicationRecord
  validates :name, presence: true
  validates :dob, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
end
