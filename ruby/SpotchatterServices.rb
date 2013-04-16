
require 'rubygems'
require 'sinatra'
require 'json'
load 'chat.rb'

before do
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
  headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, X-CSRF-Token'
end

get '/Services/GetChats/' do
  
  lat = params[:lat].to_f
  lng = params[:lng].to_f
  
  newChats = Array.new()
  
  newChats << Chat.new("Michael", lat, lng, "This is a test", "4/14/2013 1:28:43").to_json
  newChats << Chat.new("Dave", lat + 0.0001, lng + 0.0002, "Did the test work?", "4/14/2013 1:29:13").to_json
  newChats << Chat.new("Michael", lat, lng, "No.", "4/14/2013 1:29:55").to_json
  newChats << Chat.new("Dave", lat + 0.0001, lng + 0.0002, "Bummer", "4/14/2013 1:30:10").to_json
  
  json = newChats.to_json

end
