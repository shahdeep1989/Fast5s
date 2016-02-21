class WinningPart < ActiveRecord::Base
  belongs_to :game
  has_many :winners , :dependent => :destroy

  # to store array in coordinates field
  serialize :coordinates

  has_attached_file :image_part, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image_part, content_type: /\Aimage\/.*\Z/
end
