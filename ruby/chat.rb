require 'json'

class Chat
  
  attr_reader :name, :lat, :lng, :text, :time
  attr_writer :name, :lat, :lng, :text, :time
  
  def initialize(name, lat, lng, text, time)
    @name = name
    @lat = lat
    @lng = lng
    @text = text
    @time = time
  end
  
  def to_json
    {:name => @name, :lat => @lat, :lng => @lng, :text => @text, :time => @time}.to_json 
  end
   
end