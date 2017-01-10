class College < ApplicationRecord
	has_many :students

	def self.search(search)
		if search
			where(["name LIKE ?", "%#{search}%"]).select( :id, :name, :established_year)
		else
			select( :id, :name, :established_year)
		end
	end
end
