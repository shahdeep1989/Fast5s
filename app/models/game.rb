class Game < ActiveRecord::Base

	# game_type : 1 for characters and game_type : 2 for numbers 

	has_many :rooms ,:dependent => :destroy
	has_many :winning_parts ,:dependent => :destroy

	has_attached_file :game_image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :game_image, content_type: /\Aimage\/.*\Z/

  accepts_nested_attributes_for :winning_parts ,:allow_destroy => true 
  validates :name, :interval_sec, :num_of_player, :game_image, presence: true
  validate :seconds_greater_than
  validate :num_of_player_count
  validate :valid_game_image


	def valid_game_image
  	if self.game_image.present? && self.game_image.queued_for_write[:original].present? 
    		dimensions = Paperclip::Geometry.from_file(self.game_image.queued_for_write[:original])
    		self.errors.add(:game_image, "Please upload a file at least 600 pixels wide") if dimensions.width > 600.to_f
    		self.errors.add(:game_image, "Please upload a file at least 600 pixels tall") if dimensions.height > 600.to_f
  	end
	end

  private
  def seconds_greater_than
    if self.interval_sec && (self.interval_sec < 10)
      self.errors.add(:interval_sec, "Minimum 10 Seconds Interval is Compulsory.")
    end
  end

  def num_of_player_count
    if self.num_of_player && (self.num_of_player < 2)
      self.errors.add(:num_of_player, "Minimum 2 players are Compulsory.")
    end
  end

end
