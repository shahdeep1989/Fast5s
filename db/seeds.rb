# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email: 'admin@housie.com', password: '12345678', password_confirmation: '12345678', :user_type => 1)
u = User.find_by_email('admin@housie.com')
u.update_attributes(:user_type => 1)

User.create(email: 'shahdeep1989@gmail.com', password: '12345678', password_confirmation: '12345678', :user_type => 1)
