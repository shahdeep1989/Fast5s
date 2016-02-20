class WinningPart < ActiveRecord::Base
  belongs_to :game
  has_many :winners , :dependent => :destroy
end
