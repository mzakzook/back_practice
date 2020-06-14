class CreatePatients < ActiveRecord::Migration[6.0]
  def change
    create_table :patients do |t|
      t.string :name
      t.date :dob
      t.string :email

      t.timestamps
    end
  end
end
