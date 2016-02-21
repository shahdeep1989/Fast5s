class AddAttachmentGameImageToGames < ActiveRecord::Migration
  def self.up
    change_table :games do |t|
      t.attachment :game_image
    end
  end

  def self.down
    remove_attachment :games, :game_image
  end
end
