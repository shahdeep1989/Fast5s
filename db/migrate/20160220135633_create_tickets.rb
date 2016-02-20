class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.text :num_array ,array:true, default: []
      t.references :user, index: true, foreign_key: true
      t.references :room, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
