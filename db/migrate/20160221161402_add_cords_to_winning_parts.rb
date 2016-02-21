class AddCordsToWinningParts < ActiveRecord::Migration
  def change
    add_column :winning_parts, :coordinates, :text
  end
end
