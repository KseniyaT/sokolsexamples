require 'test_helper'

class CssControllerTest < ActionController::TestCase
  test "should get birds" do
    get :birds
    assert_response :success
  end

end
