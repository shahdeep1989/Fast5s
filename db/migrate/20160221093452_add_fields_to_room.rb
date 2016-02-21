class AddFieldsToRoom < ActiveRecord::Migration
  def change
    add_column :rooms, :status, :string
    add_column :rooms, :deactivation_time, :datetime
  end
end
