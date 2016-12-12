json.extract! customer, :id, :name, :email, :city, :pincode, :created_at, :updated_at
json.url customer_url(customer, format: :json)