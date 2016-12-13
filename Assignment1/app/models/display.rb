class Display < ApplicationRecord
	validates_presence_of :input_group_by, :input_sort_by, :input_display_arr, :year_1, :year_2, :should_compare, :should_total
	
end