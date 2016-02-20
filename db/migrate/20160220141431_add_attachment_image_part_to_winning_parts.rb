class AddAttachmentImagePartToWinningParts < ActiveRecord::Migration
  def self.up
    change_table :winning_parts do |t|
      t.attachment :image_part
    end
  end

  def self.down
    remove_attachment :winning_parts, :image_part
  end
end
