class Customer < ApplicationRecord
	has_many :orders, :dependent => :destroy
	has_many :items, through: :order

	validates :name, presence: true, uniqueness: {case_sensitive: false}

	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+[a-z]+\z/i
	validates :email, presence: true, uniqueness: {case_sensitive: false},
  		format: {with: VALID_EMAIL_REGEX}

  	validates :city, presence: true


end
