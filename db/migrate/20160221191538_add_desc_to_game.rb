class AddDescToGame < ActiveRecord::Migration
  def change
    add_column :games, :description, :text
  end
end