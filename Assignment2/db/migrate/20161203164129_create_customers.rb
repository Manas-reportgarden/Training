class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :email
      t.string :city
      t.integer :pincode

      t.timestamps
    end
  end
end
