class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.references :game, index: true, foreign_key: true
      t.text :num_array_to_pass ,array:true, default: []

      t.timestamps null: false
    end
  end
end
