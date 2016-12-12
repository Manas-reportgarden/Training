class Item < ApplicationRecord
	has_many :orders
	has_many :customers, through: :order

	validates :name, presence: true
	validates :price, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
end
