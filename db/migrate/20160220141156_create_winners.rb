class CreateWinners < ActiveRecord::Migration
  def change
    create_table :winners do |t|
      t.references :user, index: true, foreign_key: true
      t.references :winning_part, index: true, foreign_key: true
      t.references :room, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
