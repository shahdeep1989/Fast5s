class CreateWinningParts < ActiveRecord::Migration
  def change
    create_table :winning_parts do |t|
      t.references :game, index: true, foreign_key: true
      t.string :text_panel
      t.float :coordinate_x
      t.float :coordinate_y
      t.integer :num_of_element

      t.timestamps null: false
    end
  end
end
