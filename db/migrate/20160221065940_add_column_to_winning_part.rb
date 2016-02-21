class AddColumnToWinningPart < ActiveRecord::Migration
  def change
    add_column :winning_parts, :part_color, :string
  end
end
