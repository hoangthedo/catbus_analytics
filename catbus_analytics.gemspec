$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "catbus_analytics/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "catbus_analytics"
  s.version     = CatbusAnalytics::VERSION
  s.authors     = ["thehoang65738"]
  s.email       = ["thehoang56738@gmail.com"]
  s.summary     = "Summary of catbus_analytics."
  s.description = "Description of catbus_analytics."
  s.license     = "Cohota"

  s.files = Dir["{app,config,db,lib,public}/**/**/**/*"]

  s.add_dependency "rails", ">= 3.2", "< 5.2"
end
