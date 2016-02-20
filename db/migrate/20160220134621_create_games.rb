class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.integer :game_type
      t.float :interval_sec
      t.integer :total_number_in_ticket
      t.integer :num_of_player

      t.timestamps null: false
    end
  end
end
